import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import xml2js from 'xml2js';
import { db } from '../../services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './ImportExport.css';

const ImportExport = () => {
  const [importType, setImportType] = useState('characters');
  const [importFormat, setImportFormat] = useState('json');
  const [exportType, setExportType] = useState('characters');
  const [exportFormat, setExportFormat] = useState('json');
  const [isLoading, setIsLoading] = useState(false);
  const convertDataToFormat = (data, format, typeName) => {
    let content;
    let mimeType;
    let extension;

    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    } else if (format === 'csv') {
      content = Papa.unparse(data);
      mimeType = 'text/csv';
      extension = 'csv';
    } else if (format === 'xml') {
      const builder = new xml2js.Builder();
      const xmlObj = { root: { [typeName]: data } };
      content = builder.buildObject(xmlObj);
      mimeType = 'application/xml';
      extension = 'xml';
    } else if (format === 'xlsx') {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, typeName);
      content = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
      mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      extension = 'xlsx';
    }

    return { content, mimeType, extension };
  };

  const downloadFile = (content, mimeType, extension, fileName) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const content = e.target.result;
        let data = [];

        if (importFormat === 'json') {
          data = JSON.parse(content);
          if (!Array.isArray(data)) {
            data = [data];
          }
        } else if (importFormat === 'csv') {
          const parsed = Papa.parse(content, { header: true });
          data = parsed.data.filter(row => Object.values(row).some(val => val)); // Remove empty rows
        } else if (importFormat === 'xml') {
          await new Promise((resolve, reject) => {
            xml2js.parseString(content, (err, result) => {
              if (err) {
                reject(err);
              } else {
                if (result.root && result.root[importType]) {
                  data = Array.isArray(result.root[importType]) 
                    ? result.root[importType] 
                    : [result.root[importType]];
                } else if (result.root && result.root.item) {
                  data = Array.isArray(result.root.item) 
                    ? result.root.item 
                    : [result.root.item];
                }
                resolve();
              }
            });
          });
        } else if (importFormat === 'xlsx') {
          const workbook = XLSX.read(content, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          data = XLSX.utils.sheet_to_json(worksheet);
        }

        // Save to Firebase
        const collectionRef = collection(db, importType);
        let successCount = 0;
        
        for (const item of data) {
          try {
            await addDoc(collectionRef, item);
            successCount++;
          } catch (error) {
            console.error('Error adding item:', error);
          }
        }
        
        alert(`Import successful! ${successCount} items imported.`);
      } catch (error) {
        console.error('Import error:', error);
        alert('Import failed! ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (importFormat === 'xlsx') {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleDownload = async (type, format) => {
    setIsLoading(true);
    try {
      const collectionRef = collection(db, type);
      const snapshot = await getDocs(collectionRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (data.length === 0) {
        alert('No data to download');
        setIsLoading(false);
        return;
      }

      const { content, mimeType, extension } = convertDataToFormat(data, format, type);
      downloadFile(content, mimeType, extension, `${type}_${new Date().getTime()}`);
      alert(`Downloaded ${data.length} items in ${format.toUpperCase()} format!`);
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const collectionRef = collection(db, exportType);
      const snapshot = await getDocs(collectionRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (data.length === 0) {
        alert('No data to export');
        setIsLoading(false);
        return;
      }

      const { content, mimeType, extension } = convertDataToFormat(data, exportFormat, exportType);
      downloadFile(content, mimeType, extension, exportType);
      alert(`Exported ${data.length} items!`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="import-export">
      <h2>Import/Export Data Manager</h2>
      
      {/* Download Section */}
      <div className="section download-section">
        <h3>Quick Download</h3>
        <p>Download your data directly in your preferred format:</p>
        <div className="download-grid">
          {['characters', 'games', 'items'].map((type) => (
            <div key={type} className="download-type">
              <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
              <div className="format-buttons">
                {['json', 'csv', 'xml', 'xlsx'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => handleDownload(type, fmt)}
                    disabled={isLoading}
                    className="format-btn"
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Import Section */}
      <div className="section import-section">
        <h3>Import Data</h3>
        <div className="import-controls">
          <div className="control-group">
            <label>Import as:</label>
            <select value={importType} onChange={(e) => setImportType(e.target.value)}>
              <option value="characters">Characters</option>
              <option value="games">Games</option>
              <option value="items">Items</option>
            </select>
          </div>
          <div className="control-group">
            <label>File Format:</label>
            <select value={importFormat} onChange={(e) => setImportFormat(e.target.value)}>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="xml">XML</option>
              <option value="xlsx">Excel</option>
            </select>
          </div>
          <div className="control-group">
            <label>Select File:</label>
            <input 
              type="file" 
              accept={`.${importFormat},.${importFormat === 'xlsx' ? 'xls' : importFormat}`}
              onChange={handleImport}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="section export-section">
        <h3>Export Data</h3>
        <div className="export-controls">
          <div className="control-group">
            <label>Export from:</label>
            <select value={exportType} onChange={(e) => setExportType(e.target.value)}>
              <option value="characters">Characters</option>
              <option value="games">Games</option>
              <option value="items">Items</option>
            </select>
          </div>
          <div className="control-group">
            <label>File Format:</label>
            <select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="xml">XML</option>
              <option value="xlsx">Excel</option>
            </select>
          </div>
          <button 
            onClick={handleExport}
            disabled={isLoading}
            className="export-btn"
          >
            {isLoading ? 'Processing...' : 'Export Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportExport;
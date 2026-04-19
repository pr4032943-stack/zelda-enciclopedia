import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { parseString, Builder } from 'xml2js';
import { db } from '../../services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './ImportExport.css';

const ImportExport = () => {
  const [importType, setImportType] = useState('characters');
  const [exportType, setExportType] = useState('characters');
  const [format, setFormat] = useState('json');

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      let data;

      try {
        if (format === 'json') {
          data = JSON.parse(content);
        } else if (format === 'csv') {
          const parsed = Papa.parse(content, { header: true });
          data = parsed.data;
        } else if (format === 'xml') {
          parseString(content, (err, result) => {
            if (err) throw err;
            data = result.root.item || result.root[importType] || [];
          });
        } else if (format === 'xlsx') {
          const workbook = XLSX.read(content, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          data = XLSX.utils.sheet_to_json(worksheet);
        }

        // Save to Firebase
        const collectionRef = collection(db, importType);
        for (const item of data) {
          await addDoc(collectionRef, item);
        }
        alert('Import successful!');
      } catch (error) {
        console.error('Import error:', error);
        alert('Import failed!');
      }
    };
    reader.readAsText(file);
  };

  const handleExport = async () => {
    try {
      const collectionRef = collection(db, exportType);
      const snapshot = await getDocs(collectionRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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
        const builder = new Builder();
        const xmlObj = { root: { [exportType]: data } };
        content = builder.buildObject(xmlObj);
        mimeType = 'application/xml';
        extension = 'xml';
      } else if (format === 'xlsx') {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, exportType);
        content = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        extension = 'xlsx';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exportType}.${extension}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed!');
    }
  };

  return (
    <div className="import-export">
      <h2>Import/Export Data</h2>
      
      <div className="section">
        <h3>Import</h3>
        <select value={importType} onChange={(e) => setImportType(e.target.value)}>
          <option value="characters">Characters</option>
          <option value="games">Games</option>
          <option value="items">Items</option>
        </select>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
          <option value="xml">XML</option>
          <option value="xlsx">Excel</option>
        </select>
        <input type="file" accept={`.${format}`} onChange={handleImport} />
      </div>

      <div className="section">
        <h3>Export</h3>
        <select value={exportType} onChange={(e) => setExportType(e.target.value)}>
          <option value="characters">Characters</option>
          <option value="games">Games</option>
          <option value="items">Items</option>
        </select>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
          <option value="xml">XML</option>
          <option value="xlsx">Excel</option>
        </select>
        <button onClick={handleExport}>Export</button>
      </div>
    </div>
  );
};

export default ImportExport;
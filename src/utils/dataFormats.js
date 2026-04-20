const ENTRY_KEYS = ['title', 'type', 'era', 'source', 'description', 'image']

const cleanValue = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? '').trim()).filter(Boolean).join(' | ')
  }

  return String(value ?? '').trim()
}

const pickValue = (entry, keys) => {
  for (const key of keys) {
    if (entry?.[key] !== undefined && entry?.[key] !== null && cleanValue(entry[key])) {
      return entry[key]
    }
  }

  return ''
}

const normalizeEntry = (entry) => ({
  title: cleanValue(
    pickValue(entry, ['title', 'name', 'label', 'headline', 'item', 'nombre']) || 'Entrada sin titulo'
  ),
  type: cleanValue(
    pickValue(entry, ['type', 'category', 'kind', 'section', 'grupo', 'collection']) || 'importado'
  ),
  era: cleanValue(
    pickValue(entry, ['era', 'game', 'year', 'period', 'timeline', 'originalConsole', 'subtitle']) || 'General'
  ),
  source: cleanValue(pickValue(entry, ['source', 'origin', 'fuente']) || 'importado'),
  description: cleanValue(
    pickValue(entry, ['description', 'summary', 'function', 'role', 'details', 'content', 'texto']) ||
      'Sin descripcion'
  ),
  image: cleanValue(pickValue(entry, ['image', 'imageUrl', 'url', 'thumbnail', 'cover']) || ''),
})

const mapCharacter = (character) =>
  normalizeEntry({
    title: character.name,
    type: 'personaje',
    era: character.game,
    source: 'data.json',
    description: character.description,
    image: character.image,
  })

const mapGame = (game) =>
  normalizeEntry({
    title: game.title,
    type: 'juego',
    era: `${game.year} - ${game.originalConsole}`,
    source: 'data.json',
    description: game.description,
    image: game.image,
  })

const mapItem = (item) =>
  normalizeEntry({
    title: item.name,
    type: 'objeto',
    era: item.function,
    source: 'data.json',
    description: item.description,
    image: item.image,
  })

export const buildEntriesFromAppData = (appData, importedEntries = []) => [
  ...(appData.characters || []).map(mapCharacter),
  ...(appData.games || []).map(mapGame),
  ...(appData.items || []).map(mapItem),
  ...importedEntries.map(normalizeEntry),
]

const splitCsvLine = (line) => {
  const values = []
  let current = ''
  let insideQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    const nextCharacter = line[index + 1]

    if (character === '"' && insideQuotes && nextCharacter === '"') {
      current += '"'
      index += 1
      continue
    }

    if (character === '"') {
      insideQuotes = !insideQuotes
      continue
    }

    if (character === ',' && !insideQuotes) {
      values.push(current)
      current = ''
      continue
    }

    current += character
  }

  values.push(current)
  return values
}

const escapeCsvValue = (value) => {
  const text = cleanValue(value)

  if (/[",\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`
  }

  return text
}

const escapeXml = (value) =>
  cleanValue(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const escapeHtml = (value) =>
  cleanValue(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const buildEntriesFromRows = (rows) =>
  rows
    .map(normalizeEntry)
    .filter((entry) => entry.title && entry.description)

export const parseJsonEntries = (text) => {
  const parsed = JSON.parse(text)

  if (Array.isArray(parsed)) {
    return buildEntriesFromRows(parsed)
  }

  if (Array.isArray(parsed.entries)) {
    return buildEntriesFromRows(parsed.entries)
  }

  if (parsed.characters || parsed.games || parsed.items) {
    return buildEntriesFromAppData(parsed)
  }

  return buildEntriesFromRows([parsed])
}

export const parseCsvEntries = (text) => {
  const [headerLine, ...dataLines] = text.trim().split(/\r?\n/).filter(Boolean)

  if (!headerLine) {
    return []
  }

  const headers = splitCsvLine(headerLine).map((header) => cleanValue(header))
  const rows = dataLines.map((line) => {
    const cells = splitCsvLine(line)

    return headers.reduce((entry, header, index) => {
      entry[header] = cleanValue(cells[index])
      return entry
    }, {})
  })

  return buildEntriesFromRows(rows)
}

export const parseXmlEntries = (text) => {
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'application/xml')
  const parserError = xml.querySelector('parsererror')

  if (parserError) {
    throw new Error('El XML no se ha podido leer correctamente.')
  }

  const entryNodes = [...xml.querySelectorAll('entry, item')]
  const rows = entryNodes.map((entryNode) => {
    const row = {}

    ENTRY_KEYS.forEach((key) => {
      row[key] = cleanValue(entryNode.querySelector(key)?.textContent)
    })

    if (!row.title) {
      row.title = cleanValue(entryNode.querySelector('name')?.textContent)
    }

    return row
  })

  return buildEntriesFromRows(rows)
}

const parseHtmlTableEntries = (text) => {
  const parser = new DOMParser()
  const html = parser.parseFromString(text, 'text/html')
  const rows = [...html.querySelectorAll('table tr')].slice(1)

  return rows.map((row) => {
    const cells = [...row.querySelectorAll('th, td')].map((cell) => cleanValue(cell.textContent))

    return {
      title: cells[0],
      type: cells[1],
      era: cells[2],
      source: cells[3],
      description: cells[4],
      image: cells[5],
    }
  })
}

const parseTsvEntries = (text) => {
  const [headerLine, ...dataLines] = text.trim().split(/\r?\n/).filter(Boolean)

  if (!headerLine) {
    return []
  }

  const headers = headerLine.split('\t').map((header) => cleanValue(header))

  return dataLines.map((line) => {
    const cells = line.split('\t')

    return headers.reduce((entry, header, index) => {
      entry[header] = cleanValue(cells[index])
      return entry
    }, {})
  })
}

export const parseXlsEntries = (text) => {
  const rows = text.includes('<table') ? parseHtmlTableEntries(text) : parseTsvEntries(text)
  return buildEntriesFromRows(rows)
}

export const toJsonEntries = (entries) =>
  JSON.stringify(
    {
      entries: entries.map(normalizeEntry),
    },
    null,
    2
  )

export const toCsvEntries = (entries) => {
  const rows = [
    ENTRY_KEYS.join(','),
    ...entries.map((entry) => ENTRY_KEYS.map((key) => escapeCsvValue(normalizeEntry(entry)[key])).join(',')),
  ]

  return rows.join('\n')
}

export const toXmlEntries = (entries) => {
  const items = entries
    .map((entry) => {
      const normalized = normalizeEntry(entry)

      return [
        '  <entry>',
        `    <title>${escapeXml(normalized.title)}</title>`,
        `    <type>${escapeXml(normalized.type)}</type>`,
        `    <era>${escapeXml(normalized.era)}</era>`,
        `    <source>${escapeXml(normalized.source)}</source>`,
        `    <description>${escapeXml(normalized.description)}</description>`,
        `    <image>${escapeXml(normalized.image)}</image>`,
        '  </entry>',
      ].join('\n')
    })
    .join('\n')

  return ['<?xml version="1.0" encoding="UTF-8"?>', '<entries>', items, '</entries>'].join('\n')
}

export const toXlsEntries = (entries) => {
  const rows = entries
    .map((entry) => {
      const normalized = normalizeEntry(entry)

      return `<tr><td>${escapeHtml(normalized.title)}</td><td>${escapeHtml(normalized.type)}</td><td>${escapeHtml(normalized.era)}</td><td>${escapeHtml(normalized.source)}</td><td>${escapeHtml(normalized.description)}</td><td>${escapeHtml(normalized.image)}</td></tr>`
    })
    .join('')

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <table border="1">
          <tr><th>title</th><th>type</th><th>era</th><th>source</th><th>description</th><th>image</th></tr>
          ${rows}
        </table>
      </body>
    </html>
  `.trim()
}

export const downloadTextFile = (fileName, content, mimeType) => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

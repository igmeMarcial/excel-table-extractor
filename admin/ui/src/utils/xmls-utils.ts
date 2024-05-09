import * as XLSX from 'xlsx';
import { Sheet } from 'xlsx';

export const getSheetHtmlRows = (sheet: Sheet): NodeListOf<Element> => {
  const html = XLSX.utils.sheet_to_html(sheet);
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.querySelectorAll('tr:has(td[data-v])');
}

import { promises as fs } from 'fs';
import path from 'path';

export async function getMarkdownContent(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'src', 'content', filename);
  const fileContent = await fs.readFile(filePath, 'utf8');
  return fileContent;
}

export async function getAllMarkdownFiles(): Promise<string[]> {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const files = await fs.readdir(contentDir);
  return files.filter(file => file.endsWith('.md'));
}

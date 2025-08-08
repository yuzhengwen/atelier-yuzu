# MyDropzone Component

A highly customizable React dropzone component built with `react-dropzone` for file uploads in Next.js applications.

## Features

- 🖱️ Drag & drop file upload
- 📁 Multiple file selection
- 🎨 Fully customizable styling
- 📊 File type validation
- 📖 File content reading
- 🚫 Disabled state support
- 📋 Optional file list display
- 🔄 Multiple read formats (text, dataURL, arrayBuffer)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFilesChange` | `(files: File[]) => void` | `undefined` | Callback when files are selected (raw File objects) |
| `onFileContentsChange` | `(fileContents: FileContent[]) => void` | `undefined` | Callback with file contents after reading |
| `accept` | `Accept` | `{ "image/*": [] }` | File types to accept (MIME types) |
| `maxFiles` | `number` | `undefined` | Maximum number of files |
| `multiple` | `boolean` | `true` | Allow multiple file selection |
| `disabled` | `boolean` | `false` | Disable the dropzone |
| `className` | `string` | `undefined` | CSS class name |
| `style` | `CSSProperties` | `undefined` | Inline styles |
| `placeholder` | `string` | `"Drag & drop some files here, or click to select files"` | Placeholder text |
| `showFileList` | `boolean` | `true` | Show list of selected files |
| `readAs` | `'text' \| 'dataURL' \| 'arrayBuffer'` | `'arrayBuffer'` | How to read file contents |

### FileContent Type

```typescript
interface FileContent {
  name: string;
  content: string | ArrayBuffer | null;
}
```

## Usage Examples

### Basic Image Upload

```tsx
import MyDropzone from '@/components/MyDropzone';

function ImageUpload() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <MyDropzone
      onFilesChange={setFiles}
      accept={{ "image/*": [".jpeg", ".jpg", ".png", ".gif"] }}
      placeholder="Drop your images here"
    />
  );
}
```

### Form Integration

```tsx
function ArtworkForm() {
  const [formData, setFormData] = useState({
    title: '',
    files: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process formData.files
    console.log('Uploaded files:', formData.files);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        placeholder="Artwork title"
      />
      
      <MyDropzone
        onFilesChange={(files) => setFormData(prev => ({ ...prev, files }))}
        accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
        maxFiles={5}
        placeholder="Upload your artwork"
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Reading File Contents

```tsx
function TextFileReader() {
  const handleFileContents = (fileContents: FileContent[]) => {
    fileContents.forEach(file => {
      console.log(`File: ${file.name}`);
      console.log(`Content: ${file.content}`);
    });
  };

  return (
    <MyDropzone
      onFileContentsChange={handleFileContents}
      accept={{ "text/*": [".txt", ".csv", ".json"] }}
      readAs="text"
      placeholder="Drop text files to read content"
    />
  );
}
```

### Single File Upload (Avatar)

```tsx
function AvatarUpload() {
  const [avatar, setAvatar] = useState<File[]>([]);

  return (
    <MyDropzone
      onFilesChange={setAvatar}
      accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
      multiple={false}
      maxFiles={1}
      placeholder="Upload your profile picture"
      showFileList={false}
      style={{ maxWidth: "300px", height: "200px" }}
    />
  );
}
```

### Document Upload

```tsx
function DocumentUpload() {
  return (
    <MyDropzone
      accept={{
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        "text/plain": [".txt"]
      }}
      placeholder="Drop PDF, DOC, DOCX, or TXT files"
    />
  );
}
```

### Custom Styling

```tsx
function CustomStyledDropzone() {
  return (
    <MyDropzone
      className="border-4 border-dashed border-blue-300 bg-blue-50 rounded-xl"
      style={{
        color: "#1e40af",
        fontWeight: "bold",
        minHeight: "150px"
      }}
      placeholder="Custom styled dropzone"
    />
  );
}
```

## File Processing

The component provides two ways to handle files:

1. **Raw Files** (`onFilesChange`): Get File objects directly for form submission or API upload
2. **File Contents** (`onFileContentsChange`): Get file contents read as text, dataURL, or arrayBuffer

### When to use each:

- **Raw Files**: When uploading to APIs, storing in FormData, or when you need file metadata
- **File Contents**: When you need to preview images, process text files, or work with file data directly

## Common Accept Types

```typescript
// Images
accept={{ "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] }}

// Documents
accept={{
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
}}

// Text files
accept={{ "text/*": [".txt", ".csv", ".json"] }}

// Audio files
accept={{ "audio/*": [".mp3", ".wav", ".ogg"] }}

// Video files
accept={{ "video/*": [".mp4", ".avi", ".mov"] }}

// Any file
accept={{}}
```

## Styling

The component comes with sensible defaults but can be fully customized:

- Use the `className` prop for CSS classes
- Use the `style` prop for inline styles
- The component responds to drag states with visual feedback
- Disabled state is automatically styled

## Dependencies

- `react-dropzone`: File drop functionality
- `react`: React hooks and components

## TypeScript Support

The component is fully typed with TypeScript, providing excellent developer experience with autocompletion and type checking.

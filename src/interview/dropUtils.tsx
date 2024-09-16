export type FilesAndFolders = {
  emptyFolders: FolderWithDepth[];
  files: FileWithPath[];
  nonEmptyFolders: FolderWithDepth[];
};

export type DeepFilesAndFolders = FilesAndFolders & {
  tooDeep?: FilesAndFolders;
};

export type FileWithPath = {
  file: File;
  path: string;
};

export type FolderWithDepth = {
  depth: number;
  path: string;
};

type GetFilesAndFoldersOptions = {
  ignoreNames?: Set<string>;
  includeTooDeep?: boolean;
  maxDepth?: number;
};

function isFileEntry(entry: FileSystemEntry): entry is FileSystemFileEntry {
  return entry.isFile;
}

function isDirectoryEntry(entry: FileSystemEntry): entry is FileSystemDirectoryEntry {
  return entry.isDirectory;
}

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

const defaultIgnoredNames = new Set(['Desktop.ini', 'desktop.ini']);

export async function dropItemsToFilesAndFolders(
  items: DataTransferItem[],
  options?: GetFilesAndFoldersOptions
): Promise<DeepFilesAndFolders> {
  return await getFilesAndFolders(getFileSystemEntries(items), options);
}

function getFileSystemEntries(items: DataTransferItem[]): FileSystemEntry[] {
  return items
    .filter((item) => item.kind === 'file')
    .map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entry: FileSystemEntry | null = item.webkitGetAsEntry?.() || (item as any).getAsEntry?.();
      if (!entry) {
        const logItem = {
          getAsFile: String(item.getAsFile?.()),
          kind: item.kind,
          type: item.type,
          webkitGetAsEntry: String(item.webkitGetAsEntry?.()),
        };
        const userAgent = globalThis.navigator.userAgent;
        console.error('Could not fetch FileSystemEntry for item:', JSON.stringify(logItem), 'userAgent:', userAgent);
      }
      return entry;
    })
    .filter(notEmpty);
}

async function getFilesAndFolders(
  entries: FileSystemEntry[],
  options: GetFilesAndFoldersOptions = {}
): Promise<DeepFilesAndFolders> {
  const { ignoreNames = defaultIgnoredNames, maxDepth = Number.MAX_SAFE_INTEGER, includeTooDeep = false } = options;
  const files: Promise<FileWithPath>[] = [];
  const tooDeepFiles: Promise<FileWithPath>[] = [];
  const result: DeepFilesAndFolders = {
    emptyFolders: [],
    files: [],
    nonEmptyFolders: [],
    tooDeep: includeTooDeep
      ? {
          emptyFolders: [],
          files: [],
          nonEmptyFolders: [],
        }
      : undefined,
  };
  let depth = 0;
  const queue = [...entries];
  while (queue.length) {
    if (depth > maxDepth && !includeTooDeep) {
      break;
    }
    for (let levelSize = queue.length; levelSize > 0; levelSize -= 1) {
      const entry = queue.shift();
      if (!entry || entry.name?.startsWith('.') || ignoreNames.has(entry.name)) {
        continue;
      }
      if (isDirectoryEntry(entry)) {
        const directoryReader = entry.createReader();
        const directoryEntries = await new Promise<FileSystemEntry[]>((resolve, reject) => {
          directoryReader.readEntries(
            (entries) => resolve(entries),
            (error) => reject(error)
          );
        });
        const folder = { depth, path: entry.fullPath };
        const tooDeep = depth > maxDepth && result.tooDeep;
        if (directoryEntries.length) {
          (tooDeep || result).nonEmptyFolders.push(folder);
        } else {
          (tooDeep || result).emptyFolders.push(folder);
        }
        queue.push(...directoryEntries);
      } else if (isFileEntry(entry)) {
        const file = new Promise<FileWithPath>((resolve, reject) => {
          entry.file(
            (file) => {
              resolve({
                file,
                path: entry.fullPath,
              });
            },
            (error) => reject(error)
          );
        });
        (depth > maxDepth ? tooDeepFiles : files).push(file);
      }
    }
    depth += 1;
  }

  result.files = await waitForFiles(files);
  if (result.tooDeep) {
    result.tooDeep.files = await waitForFiles(tooDeepFiles);
  }

  return result;
}

async function waitForFiles(pendingFiles: Promise<FileWithPath>[]): Promise<FileWithPath[]> {
  const files: FileWithPath[] = [];
  for await (const f of pendingFiles) {
    files.push(f);
  }
  return files;
}

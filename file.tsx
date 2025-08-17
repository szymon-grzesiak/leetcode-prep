import React, { createContext, useContext, useMemo, useState } from 'react'

export type File = {
  path: string
  contents: string
}

export const workspaceContext = createContext<{
  activeFile?: File,
  activateFile: React.Dispatch<React.SetStateAction<string>>,
  files: File[]
}>({
  activeFile: null,
  activateFile: () => { },
  files: [],
})

[
    {name: "/app/src/Component.tsx", contents: "html"},
    {name: "/app/index.html", contents: "content....html"},
    {name: "/app/src/App.tsx", contents: "content...."},
    {name: "/app/Miło.tsx", contents: "content...."}
]



/app/src/App.tsx
/app/index.html
/app/src/Component.tsx
/app/Miło.tsx

/**
 * [{
 *   name: "app",
 *   contents: [{
 *     name: "src",
 *     contents: [{
 *        name: "App.tsx",
 *        contents: "content...."
 *     }]
 *   }, {
 *     name: "index.html",
 *     contents: "content....html"
 *   }]
 * }]
 */

type StorageObject = StorageFile | StorageDir;

interface StorageFile {
  type: "file";
  name: string;
  contents: string;
}

interface StorageDir {
  type: "dir";
  name: string;
  contents: StorageObject[];
}

function organizeFiles(files: File[]) {
  const newStructure: StorageObject[] = [];

  for (let i = 0; i < files.length; i++) {
    let pointer = newStructure;

    const { path, contents } = files[i];
    const elements = path.split("/");
    
    for (let j = 0; j < elements.length; j++) {
      const element = elements[j];
      const isLast = j === elements.length - 1;
      const existingObject = pointer.find(x => x.name === element)

      if (existingObject && existingObject.type === "dir") {
        pointer = existingObject.contents
        continue
      }

      const newObject: StorageObject = {
        type: isLast ? "file": "dir",
        name: element,
        contents: isLast ? contents : []
      }

      pointer.push(newObject);

      pointer = newObject.contents
    }
  }

  return newStructure;
}


export const WorkspaceProvider: React.FC<{ files: File[] }> = ({ files, children }) => {
  const [activeFilePath, setActiveFilePath] = useState<string>(null)

  const activeFile = useMemo(() => {
    const foundFile = files.find((f) => f.path === activeFilePath)
    return foundFile || files[0]
  }, [activeFilePath])

  // console.log("Log", files);
  const structure = organizeFiles(files);

  console.log(structure)

  const ctxVal = {
    activeFile,
    activateFile: setActiveFilePath,
    files,
  }

  return <workspaceContext.Provider value={ctxVal}>{children}</workspaceContext.Provider>
}

export function useWorkspaceContext() {
  return useContext(workspaceContext)
}

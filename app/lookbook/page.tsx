// app/lookbook/page.tsx
import Lookbook from '../../components/lookbook/Lookbook'
import MinimalNavbar from '../../components/navbar/MinimalNavbar'
import fs from 'fs'
import path from 'path'

export default async function LookbookPage() {
  const lookbookDir = path.join(process.cwd(), 'public', 'lookbook')

  // Read all folders in /public/lookbook
  const collectionFolders = fs.readdirSync(lookbookDir)

  const collections = collectionFolders
    .filter((folder) => folder.startsWith('collection-'))
    .map((folder) => {
      const id = parseInt(folder.replace('collection-', ''))
      const imageDir = path.join(lookbookDir, folder)
      const images = fs
        .readdirSync(imageDir)
        .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      return { id, images }
    })

  // Sort collections numerically by ID
  collections.sort((a, b) => a.id - b.id)

  return (
    // full‐screen wrapper, centers content horizontally, hides scrollbars
    <div className="h-screen w-screen flex justify-center overflow-hidden bg-black">
      {/* 
        offset 25vh from top, take up remaining 75vh,
        cap width to screen-xl so it never stretches too wide 
      */}
      <MinimalNavbar></MinimalNavbar>
      <div className="mx-auto max-w-screen-xl">
        <Lookbook collections={collections} collectionId={1} />
      </div>
    </div>
  )

}

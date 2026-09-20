"use client";

import FolderNameForm from "@/components/folder/FolderNameForm";
import { useFolders } from "@/components/folder/FolderProvider";
import Modal from "@/components/ui/Modal";
import type { Folder } from "@/lib/mock-data";

export default function EditFolderModal({
  folder,
  open,
  onClose,
}: {
  folder: Folder;
  open: boolean;
  onClose: () => void;
}) {
  const { renameFolder } = useFolders();

  return (
    <Modal open={open} onClose={onClose} title="폴더 이름 수정">
      <FolderNameForm
        initialName={folder.name}
        onSubmit={(name) => renameFolder(folder.id, name)}
        onClose={onClose}
      />
    </Modal>
  );
}

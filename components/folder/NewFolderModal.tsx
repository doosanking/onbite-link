"use client";

import FolderNameForm from "@/components/folder/FolderNameForm";
import { useFolders } from "@/components/folder/FolderProvider";
import Modal from "@/components/ui/Modal";

export default function NewFolderModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { addFolder } = useFolders();

  return (
    <Modal open={open} onClose={onClose} title="새 폴더">
      <FolderNameForm onSubmit={addFolder} onClose={onClose} />
    </Modal>
  );
}

"use client";

import LinkEditForm from "@/components/link/LinkEditForm";
import { useLinks } from "@/components/link/LinkProvider";
import Modal from "@/components/ui/Modal";
import type { LinkItem } from "@/lib/mock-data";

export default function EditLinkModal({
  link,
  open,
  onClose,
}: {
  link: LinkItem;
  open: boolean;
  onClose: () => void;
}) {
  const { updateLink } = useLinks();

  return (
    <Modal open={open} onClose={onClose} title="링크 수정">
      <LinkEditForm
        link={link}
        onSubmit={(values) => updateLink(link.id, values)}
        onClose={onClose}
      />
    </Modal>
  );
}

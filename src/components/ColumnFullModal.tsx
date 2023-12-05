import { Box, Modal, Typography } from "@mui/material";

type Props = {
  modalOpen?: boolean;
  setModalOpen: (open: boolean) => void;
};

export function ColumnFullModal({ modalOpen, setModalOpen }: Props) {
  return (
    <Modal
      open={!!modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          minWidth: 300,
          minHeight: 200,
          borderRadius: 4,
          top: "50%",
          right: "50%",
          transform: `translate(50%,-50%)`,
          background: "grey",
        }}
      >
        <Typography
          alignItems={"center"}
          align="center"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Column is full!
        </Typography>
      </Box>
    </Modal>
  );
}

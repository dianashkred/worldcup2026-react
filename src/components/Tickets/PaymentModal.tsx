import styled from "styled-components";
import Button from "../Button/Button";

type Props = {
  loading: boolean;
  error: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const PaymentModal = ({ loading, error, onConfirm, onCancel }: Props) => {
  return (
    <Overlay>
      <Box>
        <h3>Confirm payment</h3>
        <p>You are about to pay for all pending tickets.</p>

        {error && <ErrorBox>{error}</ErrorBox>}

        <Buttons>
          <Button
            label={loading ? "Processing…" : "Confirm payment"}
            disabled={loading}
            onClick={onConfirm}
          />
          <Button label="Cancel" onClick={onCancel} />
        </Buttons>
      </Box>
    </Overlay>
  );
};

export default PaymentModal;


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  background: #fff;
  padding: 24px 28px;
  border-radius: 10px;
  width: 360px;
  text-align: center;
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const ErrorBox = styled.div`
  background: #ffdddd;
  border: 1px solid #ff8888;
  color: #b30000;
  padding: 6px 10px;
  border-radius: 6px;
  margin-top: 10px;
`;

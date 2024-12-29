import api from '../../services/api';

interface FunctionProps {
  id_transaction: string;
  amount: number;
}

export async function RefundCharge(props: FunctionProps): Promise<boolean> {
  const data = {
    amount: props.amount,
    cancel_bill: true,
    comments: '',
  };
  try {
    const response = await api.post(
      `/profile/refundCharge?id_transaction=${props.id_transaction}`,
      data,
    );
    if (String(response.data.ok) === String('true')) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
}

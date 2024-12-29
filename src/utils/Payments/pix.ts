import axios from 'axios';
import env from '../../Config/Environment';
import { User } from '../../hooks/auth';

interface ReturnProps {
  id_transaction: string;
  url: string;
  key: string;
  requestSuccess: boolean;
}

async function PixPayment(price: number, user: User): Promise<ReturnProps> {
  const headers = {
    'x-api-key': env.x_api_key,
    'Content-Type': 'application/json',
  };

  const data = {
    IsSandbox: env.sandbox,
    Application: 'Beach Sports Center',
    Vendor: 'ANTONIO PRIMO FERREIRA NETO',
    CallbackUrl: 'https://callbacks.exemplo.com.br/api/Notify',
    PaymentMethod: '6',
    Reference: 'Voucher',
    Customer: {
      Name: user.name,
      Identity: user.ssn,
      Phone: user.cellphone,
      Email: user.email,
      Address: {
        ZipCode: user.zipCode,
        Street: user.street,
        Number: user.number,
        Complement: user.complement,
        District: user.district,
        CityName: user.city,
        StateInitials: user.state,
        CountryName: 'Brasil',
      },
    },
    Products: [
      {
        Code: '001',
        Description: 'Gift Voucher',
        UnitPrice: price,
        Quantity: 1,
      },
    ],
  };
  const returnProps: ReturnProps = {
    id_transaction: '',
    url: '',
    key: '',
    requestSuccess: false,
  };

  const response = await axios.post(
    'https://payment.safe2pay.com.br/v2/Payment',
    data,
    {
      headers,
    },
  );

  if (response.data.ResponseDetail.Message === 'Pagamento Pendente') {
    returnProps.id_transaction = String(
      response.data.ResponseDetail.IdTransaction,
    );
    returnProps.url = response.data.ResponseDetail.QrCode;
    returnProps.key = response.data.ResponseDetail.Key;
    returnProps.requestSuccess = true;
  }

  return returnProps;
}

export default PixPayment;

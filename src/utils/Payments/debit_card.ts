import axios from 'axios';
import env from '../../Config/Environment';

interface ReturnProps {
  id_transaction: string;
  url: string;
  requestSuccess: boolean;
}

interface PageProps {
  price: number;
  name: string;
  ssn: string;
  cellphone: string;
  email: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

async function DebitCardPayment(props: PageProps): Promise<ReturnProps> {
  const headers = {
    'x-api-key': env.x_api_key,
    'Content-Type': 'application/json',
  };

  const data = {
    IsSandbox: env.sandbox,
    Application: 'Beach Sports Center',
    Vendor: 'ANTONIO PRIMO FERREIRA NETO',
    CallbackUrl: 'https://callbacks.exemplo.com.br/api/Notify',
    PaymentMethod: '4',
    Customer: {
      Name: props.name,
      Identity: props.ssn,
      Phone: props.cellphone,
      Email: props.email,
      Address: {
        ZipCode: props.zipCode,
        Street: props.street,
        Number: props.number,
        Complement: props.complement,
        District: props.district,
        CityName: props.city,
        StateInitials: props.state,
        CountryName: 'Brasil',
      },
    },
    Products: [
      {
        Code: '001',
        Description: 'Day Use',
        UnitPrice: props.price,
        Quantity: 1,
      },
    ],
    PaymentObject: {
      Holder: props.name,
      CardNumber: props.cardNumber,
      ExpirationDate: props.cardExpiry,
      SecurityCode: props.cardCvc,
      Authenticate: true,
      SoftDescriptor: 'Voucher',
    },
  };
  const returnProps: ReturnProps = {
    id_transaction: '',
    url: '',
    requestSuccess: false,
  };

  const response = await axios.post(
    'https://payment.safe2pay.com.br/v2/Payment',
    data,
    {
      headers,
    },
  );

  if (String(response.data.ResponseDetail.Status) === '1') {
    returnProps.id_transaction = response.data.ResponseDetail.IdTransaction;
    returnProps.url = response.data.ResponseDetail.AuthenticationUrl;
    returnProps.requestSuccess = true;
  }

  return returnProps;
}

export default DebitCardPayment;

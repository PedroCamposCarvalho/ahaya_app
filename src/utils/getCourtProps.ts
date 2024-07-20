interface ReturnProps {
  id_court: string;
  color: string;
}

function getCourtProps(court: number): ReturnProps | undefined {
  switch (court) {
    case 1:
      return {
        id_court: 'c63a152b-fd59-4e68-9c76-c163656db594',
        color: 'red',
      };

    case 2:
      return {
        id_court: '9918c1eb-b0b7-484f-9604-027aa798001b',
        color: 'blue',
      };

    case 3:
      return {
        id_court: 'd2554152-1061-4b7e-9aa6-44a612fcda8a',
        color: 'black',
      };

    case 4:
      return {
        id_court: '5cd37da8-8f63-4385-8092-1eae803de593',
        color: 'orange',
      };

    case 5:
      return {
        id_court: 'fb381ac1-3fa3-4bf2-a4de-c9ff6d75a626',
        color: 'green',
      };

    case 6:
      return {
        id_court: '8b3be843-d065-42f5-841f-0b2afee028a9',
        color: 'red',
      };

    default:
      undefined;
  }
}

export default getCourtProps;

interface FunctionProps {
  itensPerPage: number;
  apiCount: number;
}

export default function getMaxPages({
  itensPerPage,
  apiCount,
}: FunctionProps): number {
  if (Number(apiCount) <= 5) {
    return 1;
  }
  const division = apiCount / itensPerPage;

  if (division % 2 === 0) {
    return division;
  }

  const decimalNumber = String(division).split('.');

  return Number(decimalNumber[0]) + 1;
}

type Company = {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
};

export type Job = {
  id: number;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  company: Company;
};

import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

const FALLBACK = {
  academyName: 'Alchemy 360 Sports Arena',
  address: 'Sector 22-D, Jhajjar Road, near Village-Maina, Rohtak, Haryana 124001',
  phone: '+91 99921 01885',
  email: 'info.alchemy360@gmail.com',
  operatingHours: '5:00 AM – 11:00 PM, 7 days a week',
};

export function useAcademyInfo() {
  const { data } = useQuery({
    queryKey: ['academy-info-public'],
    queryFn: () => api.get('/academy-settings/public').then((r) => r.data.data),
    staleTime: 5 * 60 * 1000,
  });
  // Merge DB values over fallbacks so empty fields in DB still show something
  return { ...FALLBACK, ...data };
}

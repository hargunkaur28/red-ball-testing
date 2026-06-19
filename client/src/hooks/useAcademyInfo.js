import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

const FALLBACK = {
  academyName: 'Red Ball Sports Arena',
  address: 'Sector 22-D, Jhajjar Road, near Village-Maina, Rohtak, Haryana 124001',
  phone: '+91 93500 76653',
  email: 'info@redballsportsarena.in',
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

export default speed => {
  if (typeof speed !== 'number') return '-';
  if (speed < 1) return 'Tyyntä';
  if (speed < 3.5) return 'Heikkoa tuulta';
  if (speed < 7.5) return 'Kohtalaista tuulta';
  if (speed < 13.5) return 'Navakkaa tuulta';
  if (speed < 20.5) return 'Kovaa tuulta';
  if (speed < 32.5) return 'Myrsky';
  return 'Hirmumyrsky';
};

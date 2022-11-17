const parseBadgeContent = (content: string) => {
  switch (content) {
    case 'historical_city':
      return 'Cidade História';
      break;
    case 'modern_city':
      return 'Cidade Moderna';
      break;
    case 'beach':
      return 'Praia';
      break;
    case 'countryside':
      return 'Interior';
      break;
    case 'mountain':
      return 'Montanha';
      break;
    case 'waterfall':
      return 'Cachoeira';
      break;
    case 'camping':
      return 'Camping';
      break;
    case 'trekking':
      return 'Trekking';
      break;

    default:
      null;
      break;
  }
};

export { parseBadgeContent };
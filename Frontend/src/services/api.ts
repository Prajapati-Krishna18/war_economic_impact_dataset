const API_BASE_URL = 'http://localhost:5000/api/v1';

export const fetchStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    const data = await response.json();
    return data.data; // Since ApiResponse wraps payload in `data`
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
};

export const fetchOngoingConflicts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/conflicts?status=Ongoing&limit=10`);
    if (!response.ok) throw new Error('Failed to fetch ongoing conflicts');
    const data = await response.json();
    return data.data; // The conflicts array
  } catch (error) {
    console.error('Error fetching ongoing conflicts:', error);
    return [];
  }
};

export const fetchAllConflicts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/conflicts?limit=50`);
    if (!response.ok) throw new Error('Failed to fetch conflicts');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching conflicts:', error);
    return [];
  }
};

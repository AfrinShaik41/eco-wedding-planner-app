
export const initialData = {
  users: [
    {
      id: '1',
      email: 'customer@test.com',
      password: 'password',
      role: 'customer',
      name: 'John Doe',
      phone: '+1234567890',
      address: '123 Main St'
    },
    {
      id: '2',
      email: 'admin@test.com',
      password: 'password',
      role: 'admin',
      name: 'Admin User',
      phone: '+1234567891'
    },
    {
      id: '3',
      email: 'manager@test.com',
      password: 'password',
      role: 'manager',
      name: 'Manager User',
      phone: '+1234567892'
    }
  ],
  events: [
    {
      id: '1',
      customerId: '1',
      title: 'Green Wedding Celebration',
      date: '2024-08-15',
      venue: 'Eco Garden Hall',
      guests: 150,
      status: 'planned'
    }
  ],
  managers: [
    {
      id: '3',
      name: 'Manager User',
      email: 'manager@test.com',
      department: 'Events',
      status: 'active'
    }
  ],
  staff: [
    {
      id: '4',
      name: 'Staff Member 1',
      role: 'Decorator',
      status: 'available'
    }
  ],
  shifts: [
    {
      id: '1',
      managerId: '3',
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '17:00',
      status: 'scheduled'
    }
  ]
};

export const initializeData = () => {
  if (!localStorage.getItem('zeroWasteData')) {
    localStorage.setItem('zeroWasteData', JSON.stringify(initialData));
  }
};

export const getData = (key) => {
  const data = JSON.parse(localStorage.getItem('zeroWasteData') || '{}');
  return data[key] || [];
};

export const setData = (key, value) => {
  const data = JSON.parse(localStorage.getItem('zeroWasteData') || '{}');
  data[key] = value;
  localStorage.setItem('zeroWasteData', JSON.stringify(data));
};

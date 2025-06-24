
export const initialData = {
  users: [
    {
      id: '1',
      email: 'afrin@example.com',
      password: 'password',
      role: 'customer',
      name: 'Afrin Shaik',
      phone: '+91-9876543210',
      address: '123 Banjara Hills, Hyderabad'
    },
    {
      id: '2',
      email: 'admin@test.com',
      password: 'password',
      role: 'admin',
      name: 'Admin User',
      phone: '+91-9876543211'
    },
    {
      id: '3',
      email: 'maya@example.com',
      password: 'password',
      role: 'manager',
      name: 'Maya Rao',
      phone: '+91-9876543212',
      department: 'Event Decor',
      status: 'inactive'
    },
    {
      id: '4',
      email: 'john@example.com',
      password: 'password',
      role: 'manager',
      name: 'John Smith',
      phone: '+91-9876543213',
      department: 'Food Oversight',
      status: 'active'
    },
    {
      id: '5',
      email: 'adil@example.com',
      password: 'password',
      role: 'manager',
      name: 'Adil Khan',
      phone: '+91-9876543214',
      department: 'Coordination',
      status: 'pending'
    }
  ],
  events: [
    {
      id: '1',
      customerId: '1',
      title: 'Eco-Friendly Wedding',
      date: '2025-12-05',
      venue: 'Hyderabad Eco Garden',
      guests: 150,
      status: 'planned',
      description: 'A sustainable wedding celebration with zero waste practices',
      budget: '$25,000'
    },
    {
      id: '2',
      customerId: '6',
      title: 'Green Wedding 2025',
      date: '2025-12-15',
      venue: 'BioPark Hall',
      guests: 200,
      status: 'planned',
      description: 'Traditional setup with eco-friendly elements'
    },
    {
      id: '3',
      customerId: '7',
      title: 'Arjun & Priya Wedding',
      date: '2025-11-20',
      venue: 'Nature Resort',
      guests: 150,
      status: 'confirmed',
      description: 'Vegan menu with organic decorations'
    },
    {
      id: '4',
      customerId: '8',
      title: 'Sameer & Ayesha Wedding',
      date: '2025-10-25',
      venue: 'Heritage Palace',
      guests: 80,
      status: 'confirmed',
      description: 'Traditional setup with sustainable practices'
    }
  ],
  assignments: [
    {
      id: '1',
      managerId: '3',
      eventId: '1',
      task: 'Decor Setup',
      priority: 'high',
      dueDate: '2025-12-01',
      status: 'pending',
      createdAt: '2024-11-15T10:00:00Z'
    },
    {
      id: '2',
      managerId: '4',
      eventId: '1',
      task: 'Food Oversight',
      priority: 'high',
      dueDate: '2025-12-04',
      status: 'in-progress',
      createdAt: '2024-11-15T11:00:00Z'
    },
    {
      id: '3',
      managerId: '5',
      eventId: '2',
      task: 'Venue Coordination',
      priority: 'medium',
      dueDate: '2025-12-10',
      status: 'pending',
      createdAt: '2024-11-16T09:00:00Z'
    }
  ],
  shifts: [
    {
      id: '1',
      managerId: '4',
      date: '2024-11-20',
      startTime: '08:00',
      endTime: '12:00',
      status: 'scheduled',
      description: 'Morning setup shift'
    },
    {
      id: '2',
      managerId: '5',
      date: '2024-11-20',
      startTime: '13:00',
      endTime: '17:00',
      status: 'scheduled',
      description: 'Afternoon coordination shift'
    },
    {
      id: '3',
      managerId: '3',
      date: '2024-11-21',
      startTime: '09:00',
      endTime: '13:00',
      status: 'scheduled',
      description: 'Decoration preparation'
    },
    {
      id: '4',
      managerId: '4',
      date: '2024-11-21',
      startTime: '14:00',
      endTime: '18:00',
      status: 'completed',
      description: 'Food preparation oversight'
    }
  ],
  staff: [
    {
      id: '1',
      name: 'Rahul Kumar',
      role: 'Decorator',
      status: 'assigned',
      department: 'Decoration',
      assignedTo: 'Event 1'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      role: 'Chef',
      status: 'assigned',
      department: 'Catering',
      assignedTo: 'Event 1'
    },
    {
      id: '3',
      name: 'Arjun Reddy',
      role: 'Coordinator',
      status: 'available',
      department: 'Coordination',
      assignedTo: null
    },
    {
      id: '4',
      name: 'Sneha Patel',
      role: 'Server',
      status: 'assigned',
      department: 'Service',
      assignedTo: 'Event 2'
    },
    {
      id: '5',
      name: 'Kiran Singh',
      role: 'Security',
      status: 'available',
      department: 'Security',
      assignedTo: null
    },
    {
      id: '6',
      name: 'Deepa Nair',
      role: 'Florist',
      status: 'assigned',
      department: 'Decoration',
      assignedTo: 'Event 1'
    },
    {
      id: '7',
      name: 'Vikram Joshi',
      role: 'Photographer',
      status: 'assigned',
      department: 'Media',
      assignedTo: 'Event 2'
    },
    {
      id: '8',
      name: 'Meera Das',
      role: 'Cleaner',
      status: 'assigned',
      department: 'Maintenance',
      assignedTo: 'Event 1'
    },
    {
      id: '9',
      name: 'Suresh Kumar',
      role: 'Driver',
      status: 'assigned',
      department: 'Transport',
      assignedTo: 'Event 2'
    },
    {
      id: '10',
      name: 'Kavita Rao',
      role: 'Assistant',
      status: 'assigned',
      department: 'General',
      assignedTo: 'Event 1'
    },
    {
      id: '11',
      name: 'Ravi Gupta',
      role: 'Technician',
      status: 'assigned',
      department: 'Technical',
      assignedTo: 'Event 2'
    },
    {
      id: '12',
      name: 'Anita Verma',
      role: 'Manager Assistant',
      status: 'available',
      department: 'Administration',
      assignedTo: null
    }
  ],
  customers: [
    {
      id: '6',
      name: 'Green Wedding Couple',
      email: 'green@example.com',
      phone: '+91-9876543215',
      eventType: 'Traditional',
      guests: 200,
      status: 'confirmed'
    },
    {
      id: '7',
      name: 'Arjun & Priya',
      email: 'arjun.priya@example.com',
      phone: '+91-9876543216',
      eventType: 'Vegan',
      guests: 150,
      status: 'confirmed',
      specialRequests: 'Vegan Menu, No plastic usage'
    },
    {
      id: '8',
      name: 'Sameer & Ayesha',
      email: 'sameer.ayesha@example.com',
      phone: '+91-9876543217',
      eventType: 'Traditional',
      guests: 80,
      status: 'confirmed',
      specialRequests: 'Traditional setup with sustainable practices'
    }
  ],
  foodItems: [
    {
      id: '1',
      name: 'Paneer Butter Masala',
      category: 'Vegetarian Main Course',
      sustainable: true,
      description: 'Made with organic paneer and locally sourced ingredients'
    },
    {
      id: '2',
      name: 'Jeera Rice',
      category: 'Rice',
      sustainable: true,
      description: 'Organic basmati rice with cumin'
    },
    {
      id: '3',
      name: 'Grilled Chicken',
      category: 'Non-Vegetarian Main Course',
      sustainable: true,
      description: 'Free-range chicken grilled with herbs'
    },
    {
      id: '4',
      name: 'Banana Leaf Plates',
      category: 'Sustainable Serving',
      sustainable: true,
      description: 'Eco-friendly serving plates made from banana leaves'
    },
    {
      id: '5',
      name: 'Steel Water Bottles',
      category: 'Beverages',
      sustainable: true,
      description: 'Reusable steel bottles to eliminate plastic waste'
    }
  ],
  analytics: {
    customers: {
      booked: 35,
      confirmed: 25,
      canceled: 5,
      walkins: 5
    },
    monthlyData: [
      { month: 'Jan', bookings: 12, revenue: 45000 },
      { month: 'Feb', bookings: 18, revenue: 67000 },
      { month: 'Mar', bookings: 22, revenue: 82000 },
      { month: 'Apr', bookings: 15, revenue: 56000 },
      { month: 'May', bookings: 28, revenue: 98000 },
      { month: 'Jun', bookings: 32, revenue: 125000 }
    ]
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

export const initializeData = () => {
  const existingData = localStorage.getItem('zeroWasteData');
  if (!existingData) {
    localStorage.setItem('zeroWasteData', JSON.stringify(initialData));
  }
};

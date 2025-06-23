
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const FoodDetails = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Organic Garden Salad', category: 'Appetizer', sustainable: true },
    { id: 2, name: 'Local Farm-to-Table Main', category: 'Main Course', sustainable: true },
    { id: 3, name: 'Vegan Dessert Selection', category: 'Dessert', sustainable: true }
  ]);
  
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    description: '',
    sustainable: true,
    allergens: ''
  });
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const item = {
        ...newItem,
        id: Date.now(),
      };
      
      setMenuItems([...menuItems, item]);
      
      toast({
        title: "Menu item added!",
        description: "Your sustainable food option has been saved.",
      });

      setNewItem({
        name: '',
        category: '',
        description: '',
        sustainable: true,
        allergens: ''
      });
    } catch (error) {
      toast({
        title: "Failed to add item",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const sustainabilityScore = Math.round((menuItems.filter(item => item.sustainable).length / menuItems.length) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Food Details</h1>
        <p className="text-gray-600">Plan your sustainable wedding menu</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-l-4 border-green-500">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{sustainabilityScore}%</div>
            <div className="text-sm text-gray-600">Sustainability Score</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-blue-500">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{menuItems.length}</div>
            <div className="text-sm text-gray-600">Menu Items</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-[#FF8080]">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-[#FF8080]">Local</div>
            <div className="text-sm text-gray-600">Source Priority</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🍽️</span>
              <span>Add Menu Item</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Organic Garden Salad"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  placeholder="Appetizer, Main Course, Dessert"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Fresh organic ingredients sourced locally..."
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergens">Allergens</Label>
                <Input
                  id="allergens"
                  value={newItem.allergens}
                  onChange={(e) => setNewItem({ ...newItem, allergens: e.target.value })}
                  placeholder="Nuts, Gluten, Dairy"
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newItem.sustainable}
                  onCheckedChange={(checked) => setNewItem({ ...newItem, sustainable: checked })}
                />
                <Label>Sustainable/Eco-friendly</Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF8080] hover:bg-[#FF8080]/90 text-white transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Adding Item...' : 'Add Menu Item'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📋</span>
              <span>Current Menu</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#FF8080]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      {item.sustainable && (
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          🌱 Sustainable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoodDetails;

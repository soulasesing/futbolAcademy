"use client";
import { useState, useEffect } from 'react';
import { BarChart3, Users, TrendingUp, Bell, Search, Menu, X, Settings, Home, Activity, Calendar, MessageSquare, Sparkles, Eye, DollarSign, Target, Briefcase } from 'lucide-react';
import LogoutButton from "./logout-button";

export default function DashboardContent({ 
  role = "Admin", 
  name = "John Doe" 
}: { 
  role: string; 
  name: string 
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: Users, label: 'Total Users', value: '12,847', change: '+12.5%', color: 'from-emerald-500 to-green-500' },
    { icon: DollarSign, label: 'Revenue', value: '$84,293', change: '+8.2%', color: 'from-green-500 to-teal-500' },
    { icon: Activity, label: 'Active Sessions', value: '2,341', change: '+23.1%', color: 'from-teal-500 to-cyan-500' },
    { icon: Target, label: 'Goals Achieved', value: '94%', change: '+5.4%', color: 'from-cyan-500 to-emerald-500' }
  ];

  const menuItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const recentActivities = [
    { user: 'Sarah Chen', action: 'completed project "Mobile App"', time: '2 min ago', avatar: '👩‍💻' },
    { user: 'Mike Johnson', action: 'added new team member', time: '15 min ago', avatar: '👨‍💼' },
    { user: 'Emma Davis', action: 'updated dashboard metrics', time: '1 hour ago', avatar: '👩‍🎨' },
    { user: 'Alex Rivera', action: 'scheduled team meeting', time: '2 hours ago', avatar: '👨‍🚀' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePos.x / 10,
            top: mousePos.y / 10,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-500/5 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/5 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg">DashPro</h2>
              <p className="text-xs text-gray-400">Ultimate Dashboard</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-white border border-emerald-500/30' 
                    : 'hover:bg-white/5 text-gray-300 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-105'}`} />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-black/10 backdrop-blur-xl border-b border-white/10 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Welcome back, {name}! 👋
                </h1>
                <p className="text-gray-400 text-sm">
                  {role} • {time ? time.toLocaleDateString() : '--/--/----'} • {time ? time.toLocaleTimeString() : '--:--:--'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors group">
                <Bell className="w-6 h-6 group-hover:animate-bounce" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>

              <LogoutButton />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts and Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Performance Overview</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm hover:bg-emerald-500/30 transition-colors">
                    7D
                  </button>
                  <button className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-colors">
                    30D
                  </button>
                  <button className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-colors">
                    90D
                  </button>
                </div>
              </div>
              
              {/* Simulated chart area */}
              <div className="h-64 bg-gradient-to-t from-emerald-500/10 to-transparent rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-around p-4">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-emerald-500 to-green-500 rounded-t-sm animate-pulse"
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                        width: '20px',
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-lg">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        <span className="text-emerald-300">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: 'Add User', color: 'from-emerald-500 to-green-500' },
                  { icon: Briefcase, label: 'New Project', color: 'from-green-500 to-teal-500' },
                  { icon: Calendar, label: 'Schedule', color: 'from-teal-500 to-cyan-500' },
                  { icon: MessageSquare, label: 'Send Message', color: 'from-cyan-500 to-emerald-500' }
                ].map((action, index) => (
                  <button
                    key={action.label}
                    className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-105 group"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">System Status</h3>
              <div className="space-y-4">
                {[
                  { label: 'Server Performance', value: 98, color: 'bg-emerald-500' },
                  { label: 'Database Health', value: 95, color: 'bg-green-500' },
                  { label: 'API Response Time', value: 87, color: 'bg-teal-500' },
                  { label: 'Security Score', value: 99, color: 'bg-cyan-500' }
                ].map((item, index) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.label}</span>
                      <span className="text-white font-medium">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
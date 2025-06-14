import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import BookingModal from '../components/BookingModal';
import FilterChips from '../components/FilterChips';
import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import useCarStatusPoller from '../hooks/useCarStatusPoller';
import { useAuth } from '../context/AuthContext';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedFilters, setSelectedFilters] = useState(['все']);

  const { isAuthenticated } = useAuth();
  const setStatusUpdateTimeout = useCarStatusPoller(cars, setCars);

  const handleBooking = async (carId, startTime, endTime) => {
    try {
      const response = await axios.post('https://meistermode-carsharing-backend-7481.twc1.net/api/bookings', {
        car_id: carId,
        start_time: startTime,
        end_time: endTime
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setStatusUpdateTimeout(carId, endTime);
      setCars(prevCars =>
        prevCars.map(car =>
          car.id === carId
            ? { ...car, isBooked: true }
            : car
        )
      );

      return response.data;
    } catch (error) {
      console.error('Ошибка при бронировании машины:', error);
      throw error;
    }
  };

  const handleFilterChange = useCallback((filterId) => {
    setSelectedFilters(prev => {
      // If "все" (all) is selected, clear other filters
      if (filterId === 'все') {
        return ['все'];
      }
      
      // If selecting a new filter while "все" is active, remove "все" and add the new filter
      if (prev.includes('все')) {
        return [filterId];
      }

      // Toggle the selected filter
      if (prev.includes(filterId)) {
        const newFilters = prev.filter(f => f !== filterId);
        // If no filters remain, default to "все"
        return newFilters.length === 0 ? ['все'] : newFilters;
      } else {
        return [...prev, filterId];
      }
    });
  }, []);

  const filteredCars = useMemo(() => {
    const matchesSearch = car => 
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.location.toLowerCase().includes(searchQuery.toLowerCase());

    const hasAvailableFilter = selectedFilters.includes('доступные');
    const hasNewFilter = selectedFilters.includes('новые');
    const hasCategoryFilter = 
      selectedFilters.includes('эконом') || 
      selectedFilters.includes('комфорт') || 
      selectedFilters.includes('премиум');

    if (hasAvailableFilter && !hasCategoryFilter && !hasNewFilter) {
      return cars.filter(car => matchesSearch(car) && !car.isBooked);
    }

    if (hasAvailableFilter && hasCategoryFilter) {
      const matchesCategory = car => 
        (selectedFilters.includes('эконом') && car.category === 'эконом') ||
        (selectedFilters.includes('комфорт') && car.category === 'комфорт') ||
        (selectedFilters.includes('премиум') && car.category === 'премиум');
      
      return cars.filter(car => matchesSearch(car) && !car.isBooked && matchesCategory(car));
    }

    if (hasCategoryFilter && !hasAvailableFilter && !hasNewFilter) {
      return cars.filter(car => matchesSearch(car) && (
        (selectedFilters.includes('эконом') && car.category === 'эконом') ||
        (selectedFilters.includes('комфорт') && car.category === 'комфорт') ||
        (selectedFilters.includes('премиум') && car.category === 'премиум')
      ));
    }

    if (hasNewFilter && !hasCategoryFilter && !hasAvailableFilter) {
      return cars.filter(car => matchesSearch(car) && car.isNew);
    }

    if (hasNewFilter && hasCategoryFilter) {
      const matchesCategory = car => 
        (selectedFilters.includes('эконом') && car.category === 'эконом') ||
        (selectedFilters.includes('комфорт') && car.category === 'комфорт') ||
        (selectedFilters.includes('премиум') && car.category === 'премиум');
      
      return cars.filter(car => matchesSearch(car) && car.isNew && matchesCategory(car));
    }

    if (hasNewFilter && hasAvailableFilter) {
      return cars.filter(car => matchesSearch(car) && car.isNew && !car.isBooked);
    }

    if (hasNewFilter && hasAvailableFilter && hasCategoryFilter) {
      const matchesCategory = car => 
        (selectedFilters.includes('эконом') && car.category === 'эконом') ||
        (selectedFilters.includes('комфорт') && car.category === 'комфорт') ||
        (selectedFilters.includes('премиум') && car.category === 'премиум');
      
      return cars.filter(car => matchesSearch(car) && car.isNew && !car.isBooked && matchesCategory(car));
    }

    if (selectedFilters.includes('все') || selectedFilters.length === 0) {
      return cars.filter(matchesSearch);
    }

    return [];
  }, [searchQuery, selectedFilters, cars]);

  const sortedCars = useMemo(() => {
    switch (sortBy) {
      case 'price-asc':
        return [...filteredCars].sort((a, b) => a.pricePerMinute - b.pricePerMinute);
      case 'price-desc':
        return [...filteredCars].sort((a, b) => b.pricePerMinute - a.pricePerMinute);
      case 'rating':
        return [...filteredCars].sort((a, b) => b.rating - a.rating);
      case 'recommended':
      default:
        // Ensure we return a new array to trigger re-render
        return [...filteredCars];
    }
  }, [filteredCars, sortBy]);

  const handleBookingSuccess = useCallback((bookingData) => {
    setCars(prevCars => prevCars.map(car => {
      if (car.id === bookingData.car_id) {
        return {
          ...car,
          isBooked: true
        };
      }
      return car;
    }));
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (!isAuthenticated) {
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        const response = await axios.get('https://meistermode-carsharing-backend-7481.twc1.net/api/cars', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const transformedCars = response.data.map(car => {
          let decodedFeatures = [];
          if (car.features) {
            try {
              const parsedFeatures = JSON.parse(car.features);
              decodedFeatures = Array.isArray(parsedFeatures) ? parsedFeatures : car.features.split(',').map(f => f.trim());
            } catch {
              decodedFeatures = car.features.split(',').map(f => f.trim());
            }
          }

          return {
            ...car,
            features: decodedFeatures,
            rating: car.rating || 4.5,
            pricePerMinute: car.price_per_minute || car.pricePerMinute,
            isBooked: Boolean(car.is_booked || car.isBooked), 
            category: car.category || 'Стандарт',
            image: car.image || '/images/cars/default-car.jpg'
          };
        });
        
        setCars(transformedCars);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError(null);
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center"
        >
          <UserIcon className="mx-auto h-16 w-16 text-indigo-500 dark:text-indigo-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Войдите, чтобы забронировать автомобиль
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Для просмотра и бронирования автомобилей необходимо авторизоваться или зарегистрироваться
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Войти
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Регистрация
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 sm:p-4">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-6">
            наши автомобили
          </h1>
          
          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:space-x-4 mb-4 sm:mb-6">
            <div className="w-full sm:w-64 relative mb-2 sm:mb-0">
              <input
                type="text"
                placeholder="поиск автомобилей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 sm:h-10 px-2 sm:px-4 py-1 sm:py-2 pl-8 sm:pl-10 rounded-lg border 
                         border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                         text-xs sm:text-sm transition-colors duration-200"
              />
              <MagnifyingGlassIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 
                                               h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto h-9 sm:h-10 px-2 sm:px-4 py-1 sm:py-2 rounded-lg border 
                         border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                         text-xs sm:text-sm transition-colors duration-200"
            >
              <option value="recommended">Рекомендованные</option>
              <option value="price-asc">Цена: от дешевых</option>
              <option value="price-desc">Цена: от дорогих</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>

          <FilterChips
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 min-h-[400px] flex items-center justify-center">
            <p>{error}</p>
          </div>
        ) : (
          <AnimatePresence>
            {sortedCars.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4">
                  Извините, по вашему запросу ничего не найдено
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilters(['все']);
                    setSortBy('recommended');
                  }}
                  className="px-4 sm:px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                >
                  Сбросить фильтры
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
              >
                {sortedCars.map((car) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CarCard 
                      car={car} 
                      onBookNow={() => {
                        setSelectedCar(car);
                        setIsModalOpen(true);
                      }} 
                      onBookingSuccess={handleBookingSuccess}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {selectedCar && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          car={selectedCar}
          onBookingSuccess={handleBookingSuccess}
          onBook={handleBooking}
        />
      )}
    </div>
  );
};

export default CarsPage;

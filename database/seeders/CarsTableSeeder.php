<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class CarsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cars = [
            [
                'id' => 1,
                'name' => 'Лада Веста',
                'type' => 'Седан',
                'category' => 'эконом',
                'location' => 'ул. 20-летия Победы, 85',
                'price_per_minute' => 5,
                'rating' => 4.6,
                'features' => json_encode(['Автомат', 'Кондиционер', 'Мультимедиа']),
                'image' => '/images/cars/lada-vesta.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 2,
                'name' => 'Лада Гранта',
                'type' => 'Седан',
                'category' => 'эконом',
                'location' => 'ул. Северная, 31',
                'price_per_minute' => 5,
                'rating' => 4.5,
                'features' => json_encode(['Механика', 'Кондиционер', 'Подогрев сидений']),
                'image' => '/images/cars/lada-granta.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 3,
                'name' => 'Лада Ларгус',
                'type' => 'Универсал',
                'category' => 'комфорт',
                'location' => 'ул. Калийная, 138А',
                'price_per_minute' => 7,
                'rating' => 4.7,
                'features' => json_encode(['Механика', 'Климат-контроль', 'Просторный салон']),
                'image' => '/images/cars/lada-largus.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 4,
                'name' => 'УАЗ Патриот',
                'type' => 'Внедорожник',
                'category' => 'бизнес',
                'location' => 'ул. Революции, 53',
                'price_per_minute' => 8,
                'rating' => 4.7,
                'features' => json_encode(['Полный привод', 'Проходимость', 'Большой багажник']),
                'image' => '/images/cars/uaz-patriot.jpg',
                'is_booked' => false,
                'is_new' => true
            ],
            [
                'id' => 5,
                'name' => 'Москвич 3',
                'type' => 'Кроссовер',
                'category' => 'бизнес',
                'location' => 'ул. Всеобуча, 106',
                'price_per_minute' => 9,
                'rating' => 4.8,
                'features' => json_encode(['Автомат', 'Современный дизайн', 'Мультимедиа']),
                'image' => '/images/cars/moskvich-3.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 6,
                'name' => 'Лада Нива Легенд',
                'type' => 'Внедорожник',
                'category' => 'эконом',
                'location' => 'ул. Молодёжная, 16',
                'price_per_minute' => 4,
                'rating' => 4.3,
                'features' => json_encode(['Полный привод', 'Компактность', 'Надежность']),
                'image' => '/images/cars/lada-niva-legend.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 7,
                'name' => 'Лада XRAY Cross',
                'type' => 'Кроссовер',
                'category' => 'бизнес',
                'location' => 'ул. Карналлитовая, 85',
                'price_per_minute' => 8,
                'rating' => 4.7,
                'features' => json_encode(['Автомат', 'Высокий клиренс', 'Просторный салон']),
                'image' => '/images/cars/lada-xray-cross.jpg',
                'is_booked' => false,
                'is_new' => true
            ],
            [
                'id' => 8,
                'name' => 'ГАЗель Next',
                'type' => 'Фургон',
                'category' => 'эконом',
                'location' => 'ул. Черняховского, 7',
                'price_per_minute' => 5,
                'rating' => 4.4,
                'features' => json_encode(['Грузовой отсек', 'Надежность', 'Экономичность']),
                'image' => '/images/cars/gazel-next.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 9,
                'name' => 'Лада Веста SW Cross',
                'type' => 'Универсал',
                'category' => 'комфорт',
                'location' => 'ул. Коммунистическая, 21В',
                'price_per_minute' => 7,
                'rating' => 4.6,
                'features' => json_encode(['Автомат', 'Просторный багажник', 'Климат-контроль']),
                'image' => '/images/cars/lada-vesta-sw-cross.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 10,
                'name' => 'Аурус Сенат',
                'type' => 'Седан',
                'category' => 'премиум',
                'location' => 'ул. Матросова, 8А',
                'price_per_minute' => 15,
                'rating' => 4.9,
                'features' => json_encode(['Премиум класс', 'Роскошный салон', 'Мощный двигатель']),
                'image' => '/images/cars/aurus-senat.jpg',
                'is_booked' => false,
                'is_new' => true
            ],
            [
                'id' => 11,
                'name' => 'УАЗ Профи',
                'type' => 'Пикап',
                'category' => 'кроссовер',
                'location' => 'ул. Большевистская, 63',
                'price_per_minute' => 10,
                'rating' => 4.7,
                'features' => json_encode(['Грузоподъемность', 'Полный привод', 'Надежность']),
                'image' => '/images/cars/uaz-profi.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 12,
                'name' => 'Evolute I-PRO',
                'type' => 'Седан',
                'category' => 'электро',
                'location' => 'ул. Набережная, 127',
                'price_per_minute' => 12,
                'rating' => 4.8,
                'features' => json_encode(['Электромобиль', 'Быстрая зарядка', 'Современные технологии']),
                'image' => '/images/cars/evolute-i-pro.jpg',
                'is_booked' => false,
                'is_new' => true
            ],
            [
                'id' => 13,
                'name' => 'Лада Нива Тревел',
                'type' => 'Внедорожник',
                'category' => 'премиум спорт',
                'location' => 'ул. Володарского, 44',
                'price_per_minute' => 20,
                'rating' => 5.0,
                'features' => json_encode(['Полный привод', 'Комфорт', 'Проходимость']),
                'image' => '/images/cars/lada-niva-travel.jpg',
                'is_booked' => false,
                'is_new' => true
            ],
            [
                'id' => 14,
                'name' => 'ГАЗон Next',
                'type' => 'Грузовик',
                'category' => 'премиум',
                'location' => 'проспект Строителей, 8',
                'price_per_minute' => 25,
                'rating' => 5.0,
                'features' => json_encode(['Большая грузоподъемность', 'Надежность', 'Комфортная кабина']),
                'image' => '/images/cars/gazon-next.jpg',
                'is_booked' => false,
                'is_new' => false
            ]
        ];

        foreach ($cars as $carData) {
            Car::create($carData);
        }
    }
}
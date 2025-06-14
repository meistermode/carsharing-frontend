import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div>
            <h3 className="text-lg font-semibold mb-2">О нас</h3>
            <p className="text-sm">Мы - ваш надежный партнер в мире каршеринга. Мы предлагаем широкий выбор автомобилей для любых нужд, от коротких поездок по городу до длительных путешествий.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Контакты</h3>
            <p className="text-sm">Email: info@carsharing-solikamsk.ru</p>
            <p className="text-sm">Телефон: +7 (919) 714-77-77</p>
            <p className="text-sm">Адрес: г. Соликамск, ул. Ленина, 25</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Мы в соцсетях</h3>
            <ul className="text-sm">
              <li><a href="#" className="hover:underline">ВКонтакте</a></li>
              <li><a href="#" className="hover:underline">Telegram</a></li>
              <li><a href="#" className="hover:underline">Одноклассники</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Все права защищены.</p>
          <p className="text-sm mt-2">Разработано с ❤️ для вас.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
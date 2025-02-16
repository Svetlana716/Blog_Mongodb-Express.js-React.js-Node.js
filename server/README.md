## Используемые технологии и решения

- Typescript в качестве основного языка проекта
- Mongodb и ODM Mongoose для хранения данных пользователей
- Node.js в качестве среды выполнения

POST /auth/signup — создаёт пользователя
POST /auth/signin — авторизация пользователя

JWT токен сохраняется в куках

GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по \_id

GET /cards — возвращает все карточки
POST /cards — создаёт карточку
DELETE /cards/:cardId — удаляет карточку по идентификатору

PATCH /users/me — обновляет профиль
PATCH /users/me/avatar — обновляет аватар
PUT /cards/:cardId/likes — поставить лайк карточке
DELETE /cards/:cardId/likes — убрать лайк с карточки

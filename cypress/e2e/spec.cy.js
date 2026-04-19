describe('Emerald Tasks E2E Tests', () => {
  const baseUrl = 'http://localhost:5173'; // Змініть на свій порт

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('should login successfully as admin', () => {
    cy.contains('button', 'Login').click();
    
    cy.get('input[placeholder="Email"]').type('a@a.com');
    cy.get('input[placeholder="Пароль"]').type('1');
    cy.get('button[type="submit"]').click();

    // Перевірка редиректу на Home та привітання
    cy.contains('🌿 Вітаємо знову, Адмін!').should('be.visible');
    cy.contains('button', 'Profile').should('be.visible');
  });


  it('should register a new user and login', () => {
    cy.contains('button', 'Register').click();

    cy.get('input[placeholder="Ім\'я"]').type('Тестовий Юзер');
    cy.get('input[placeholder="Email"]').type('test@test.com');
    cy.get('input[placeholder="Пароль"]').type('password123');
    cy.get('select').select('Чоловік');
    cy.get('input[type="date"]').type('1995-05-05');
    
    cy.contains('button', 'Зареєструватися').click();

    // Після реєстрації маємо потрапити на сторінку Login
    cy.contains('Вхід').should('be.visible');

    // Входимо під новими даними
    cy.get('input[placeholder="Email"]').type('test@test.com');
    cy.get('input[placeholder="Пароль"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains('🌿 Вітаємо знову, Тестовий Юзер!').should('be.visible');
  });


  it('should redirect to login when clicking TODO while guest', () => {
    // Cypress автоматично обробляє window.alert
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.contains('button', 'TODO list').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Будь ласка, увійдіть у систему!');
    });

    cy.contains('Вхід').should('be.visible');
  });


  it('should perform CRUD operations on tasks', () => {
    // 1. Login
    cy.contains('button', 'Login').click();
    cy.get('input[placeholder="Email"]').type('a@a.com');
    cy.get('input[placeholder="Пароль"]').type('1');
    cy.get('button[type="submit"]').click();

    // 2. Перейти до TODO
    cy.contains('button', 'TODO list').click();
    cy.contains('Мій список справ').should('be.visible');

    // 3. Create (Додати завдання)
    const taskName = 'Вивчити Cypress';
    cy.get('input[placeholder="Додати нову справу..."]').type(taskName);
    cy.contains('button', 'Додати').click();
    cy.contains(taskName).should('be.visible');

    // 4. Update (Редагувати завдання)
    cy.contains(taskName).parents('.group').find('button').contains('Edit').click();
    // Замініть рядок 76-77 у вашому тесті на цей:
    cy.get('input.border-emerald-500')
    .clear()
    .type('Вивчити Cypress та Jest')
    .blur(); // Це змусить спрацювати handleSaveEdit, який прив'язаний до onBlur

    cy.contains('Вивчити Cypress та Jest').should('be.visible');

    // 5. Toggle (Виконати)
    cy.contains('Вивчити Cypress та Jest').parents('.group').find('button').first().click();
    cy.contains('Вивчити Cypress та Jest').should('have.class', 'line-through');

    // 6. Delete (Видалити)
    cy.contains('Вивчити Cypress та Jest').parents('.group').find('button').contains('Delete').click();
    cy.contains('Вивчити Cypress та Jest').should('not.exist');
  });


  it('should display user info in profile and logout', () => {
    // Login
    cy.contains('button', 'Login').click();
    cy.get('input[placeholder="Email"]').type('a@a.com');
    cy.get('input[placeholder="Пароль"]').type('1');
    cy.get('button[type="submit"]').click();

    // Go to Profile
    cy.contains('button', 'Profile').click();
    cy.contains('a@a.com').should('be.visible');
    cy.contains('Адмін').should('be.visible');

    // Logout
    cy.contains('button', 'Вийти з акаунту').click();
    cy.contains('Останні Новини').should('be.visible');
    cy.contains('button', 'Profile').should('not.exist');
  });

  it('should show alert if registration fields are empty', () => {
    cy.contains('button', 'Register').click();
    
    // Спроба зареєструватися з пустими полями
    const stub = cy.stub();
    cy.on('window:alert', stub);
    
    cy.get('button[type="submit"]').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Заповніть поля!');
    });
  });

  it('should not show other users tasks', () => {
    // 1. Реєструємо нового юзера "User B"
    cy.contains('button', 'Register').click();
    cy.get('input[placeholder="Ім\'я"]').type('User B');
    cy.get('input[placeholder="Email"]').type('b@b.com');
    cy.get('input[placeholder="Пароль"]').type('password');
    cy.contains('button', 'Зареєструватися').click();

    // 2. Входимо як User B і додаємо таску
    cy.get('input[placeholder="Email"]').type('b@b.com');
    cy.get('input[placeholder="Пароль"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.contains('button', 'TODO list').click();
    cy.get('input[placeholder="Додати нову справу..."]').type('Secret Task for B');
    cy.contains('button', 'Додати').click();

    // 3. Виходимо
    cy.contains('button', 'Profile').click();
    cy.contains('button', 'Вийти з акаунту').click();

    // 4. Входимо як Адмін
    cy.contains('button', 'Login').click();
    cy.get('input[placeholder="Email"]').type('a@a.com');
    cy.get('input[placeholder="Пароль"]').type('1');
    cy.get('button[type="submit"]').click();
    cy.contains('button', 'TODO list').click();

    // 5. Перевіряємо, що таски User B немає в списку Адміна
    cy.contains('Secret Task for B').should('not.exist');
  });

  it('should show empty state message when no tasks exist', () => {
    // Входимо під адміном
    cy.contains('button', 'Login').click();
    cy.get('input[placeholder="Email"]').type('a@a.com');
    cy.get('input[placeholder="Пароль"]').type('1');
    cy.get('button[type="submit"]').click();
    cy.contains('button', 'TODO list').click();

    // Видаляємо початкову таску адміна
    cy.contains('Delete').click();

    // Перевіряємо повідомлення про пустий список
    cy.contains('У вас поки немає справ...').should('be.visible');
  });

  it('should display the correct student credentials in footer', () => {
    cy.get('footer')
      .should('be.visible')
      .and('contain', 'Ovchinnikov Dmytro')
      .and('contain', 'kv-51mn');
  });

  it('should navigate between About and Home pages correctly', () => {
    // Перехід на About
    cy.contains('button', 'About').click();
    cy.contains('About Emerald').should('be.visible');
    cy.get('img[alt="Logo"]').should('be.visible');

    // Повернення на Home
    cy.contains('button', 'Home').click();
    cy.contains('Останні Новини').should('be.visible');
  });

  it('should show alert on wrong login credentials', () => {
    cy.contains('button', 'Login').click();
    cy.get('input[placeholder="Email"]').type('a@a.com');
    cy.get('input[placeholder="Пароль"]').type('wrong_password');
    
    const stub = cy.stub();
    cy.on('window:alert', stub);
    
    cy.get('button[type="submit"]').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Невірні дані!');
    });
  });
});
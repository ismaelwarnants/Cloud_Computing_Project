namespace Models {
    public class AuthenticateService : IAuthenticate {
        private UserStore _userStore;

        public AuthenticateService()
        {
            _userStore = new UserStore();
        }

        public string Login(string userName, string password)
        {
            var user = _userStore.GetUser(userName);
            if (user == null || user.password != password)
            {
                Console.Write("Login failed\n");
                return null;
            }
            Console.Write("Login successful\n");
            return user.UUID;
        }

        public string CreateUser(string userName, string password)
        {
            var user = new User
            {
                UUID = Guid.NewGuid().ToString(),
                userName = userName,
                password = password
            };

            if (_userStore.AddUser(user))
            {
                Console.Write("User created\n");
                return user.UUID;
            }
            Console.Write("User creation failed\n");
            return null;
        }

    }
}
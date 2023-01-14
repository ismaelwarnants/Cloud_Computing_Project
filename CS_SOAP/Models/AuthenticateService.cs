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
                return null;
            }

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
                return user.UUID;
            }
            return null;
        }

    }
}
using System.Collections.Generic;

namespace GraphQlApi
{
    internal class UsersResponse
    {
        public List<UserResponse.UserContent> Users { get; set; }
    }
}
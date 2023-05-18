function makeFriendsList(friends) {
  let friendsArrayList = friends.map(item => item.firstName + ' ' + item.lastName);

  ul = document.createElement('ul');

  for (let friend of friendsArrayList) {
    let li = document.createElement('li');
    li.innerHTML = friend;
    ul.append(li);
  }

  return ul;
}

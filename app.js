var list

function entry(id, title, description) {
	let node = document.createElement('li');

	node.setAttribute('id', 'article-' + id);
	node.innerHTML = '#<span id="id-' + id + '">' + id + '</span>: <strong id="title-' + id + '">' + title + '</strong> - <span id="description-' + id + '">' + description + '</span> (<a href="#" onclick="update(' + id + ')">Update</a> | <a href="#" onclick="remove(\'article-' + id + '\')">Delete</a>)</li>';;

	return node;
}

function read() {
	const xhttp = new XMLHttpRequest();
	list = document.getElementById('list');

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.responseText);

			if (
				response !== undefined &&
				response.length
			) {
				response.forEach(function(item) {
					list.appendChild(entry(item.id, item.title, item.description));
				});
			}
		}
	};
	xhttp.open('GET', './data.json', true);
	xhttp.send();
}

function remove(e) {
	let item = document.getElementById(e);

	if (item !== null) item.remove();
}

function create() {
	let id = document.getElementById('id');
	let title = document.getElementById('title');
	let description = document.getElementById('description');

	remove('article-' + id.value);

	list.appendChild(entry(id.value, title.value, description.value));
}

function update(e) {
	document.getElementById('id').value = document.getElementById('id-' + e).textContent;
	document.getElementById('title').value = document.getElementById('title-' + e).textContent;
	document.getElementById('description').value = document.getElementById('description-' + e).textContent;
}
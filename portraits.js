fetch("portraits.json")
	.then(r => r.json())
	.then(data => {
		const container = document.getElementById("portraits");

		data.sort((a, b) => a.name.localeCompare(b.name));

		data.forEach(p => {
			const name = p.name;
			const years = p.years;

			const imgPath = `assets/portraits/${name}.jpg`;
			const sheetPath = `sheet/${name}/index.html`;

			const card = document.createElement("a");
			card.href = sheetPath;
			card.className = "portrait-card";

			card.innerHTML = `
				<img src="${imgPath}" alt="${name}">
				<div class="name">${name}</div>
				<div class="years">${years}</div>
			`;

			container.appendChild(card);
		});
	})
	.catch(err => console.error("Error loading portraits:", err));

document.addEventListener("DOMContentLoaded", function () {
	const buttons = document.querySelectorAll('.sidebar button');
	const contentSections = document.querySelectorAll('.content-section');

	function showSection(sectionId) {
		contentSections.forEach(section => {
			section.style.display = 'none';
		});
		document.getElementById(sectionId).style.display = 'block';
	}

	buttons.forEach(button => {
		button.addEventListener('click', function () {
			buttons.forEach(btn => btn.classList.remove('active'));
			this.classList.add('active');

			let sectionId = this.id.replace('Button', 'Content');
			showSection(sectionId);
		});
	});

	showSection('homeContent');
	document.getElementById('homeButton').classList.add('active');


	document.querySelectorAll('.modal-link').forEach(link => {
		link.addEventListener('click', function () {
			event.stopPropagation();
			let modalId = this.dataset.modalId;
			let targetId = this.dataset.target;
			let modal = document.getElementById(modalId);

			fetch('modal/' + modalId + '.html')
				.then(response => response.text())
				.then(html => {
					modal.innerHTML = html;
					modal.style.display = 'block';
					document.getElementById(targetId).scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
					document.querySelectorAll('.modal .close-button').forEach(button => {
						button.addEventListener('click', function () {
							this.closest('.modal').style.display = 'none';
						});
					});
				})
				.catch(error => console.error('Error loading modal content:', error));
		});
	});
	document.querySelectorAll('.card').forEach(card => {
		card.addEventListener('click', function () {
			let cardId = this.dataset.id;
			let modal = document.getElementById(cardId);

			fetch('modal/' + cardId + '.html')
				.then(response => response.text())
				.then(html => {
					modal.innerHTML = html;
					modal.style.display = 'block';
					modal.querySelectorAll('.close-button').forEach(button => {
						button.addEventListener('click', function () {
							modal.style.display = 'none';
						});
					});
				})
				.catch(error => console.error('Error loading modal content:', error));
		});
	});
});
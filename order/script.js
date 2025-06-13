function nextStep(current, next) {
    // Validasi langkah saat ini sebelum melanjutkan
    if (current === 1) {
        // Validasi langkah 1 (pemilihan menu)
        const quantity = document.getElementById('quantity').value;
        if (quantity < 1) {
            alert('Jumlah pesanan minimal 1');
            return;
        }
        
        // Perbarui ringkasan pesanan
        updateOrderSummary();
    } else if (current === 2) {
        // Validasi langkah 2 (data pribadi)
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const payment = document.getElementById('payment').value;
        
        if (!name || !phone || !address || !payment) {
            alert('Harap lengkapi semua data pemesan');
            return;
        }
        
        // Perbarui konfirmasi
        updateConfirmation();
    }
    
    // Sembunyikan langkah saat ini dan tampilkan langkah berikutnya
    document.getElementById('step' + current).style.display = 'none';
    document.getElementById('step' + next).style.display = 'block';
    
    // Perbarui indikator langkah
    updateStepIndicator(current, next);
}

function prevStep(current, prev) {
    // Sembunyikan langkah saat ini dan tampilkan langkah sebelumnya
    document.getElementById('step' + current).style.display = 'none';
    document.getElementById('step' + prev).style.display = 'block';
    
    // Perbarui indikator langkah
    updateStepIndicator(current, prev);
}

function updateStepIndicator(from, to) {
    // Reset semua langkah
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
    });
    
    // Setel langkah saat ini sebagai aktif
    document.querySelector(`.order-steps .step:nth-child(${to})`).classList.add('active');
}

function updateOrderSummary() {
    // Dapatkan menu yang dipilih
    const selectedMenu = document.querySelector('input[name="menu"]:checked');
    const menuName = selectedMenu.parentElement.querySelector('.menu-item-info h4').textContent;
    const menuPrice = selectedMenu.parentElement.querySelector('.menu-item-price').textContent;
    
    // Dapatkan jumlah
    const quantity = document.getElementById('quantity').value;
    const total = parseInt(menuPrice.replace(/\D/g, '')) * quantity;
    
    // Perbarui ringkasan
    document.getElementById('summary-menu').textContent = menuName;
    document.getElementById('summary-price').textContent = menuPrice;
    document.getElementById('summary-quantity').textContent = quantity;
    document.getElementById('summary-total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
    document.getElementById('summary-grand-total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function updateConfirmation() {
    // Dapatkan nilai formulir
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;
    const notes = document.getElementById('notes').value || '-';
    
    // Dapatkan ringkasan pesanan
    const menuName = document.getElementById('summary-menu').textContent;
    const quantity = document.getElementById('summary-quantity').textContent;
    const total = document.getElementById('summary-grand-total').textContent;
    
    // Perbarui konfirmasi
    document.getElementById('confirm-menu').textContent = menuName;
    document.getElementById('confirm-quantity').textContent = quantity;
    document.getElementById('confirm-notes').textContent = notes;
    document.getElementById('confirm-total').textContent = total;
    document.getElementById('confirm-name').textContent = name;
    document.getElementById('confirm-phone').textContent = phone;
    document.getElementById('confirm-address').textContent = address;
    document.getElementById('confirm-payment').textContent = document.getElementById('payment').options[document.getElementById('payment').selectedIndex].text;
    document.getElementById('confirm-grand-total').textContent = total;
}

// Tambahkan event listener untuk pemilihan menu
document.querySelectorAll('.menu-item-select').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.menu-item-select').forEach(i => {
            i.classList.remove('selected');
        });
        this.classList.add('selected');
        this.querySelector('input').checked = true;
        updateOrderSummary();
    });
});

// Perbarui ringkasan saat jumlah berubah
document.getElementById('quantity').addEventListener('change', updateOrderSummary);

// Pengiriman formulir
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Pesanan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda untuk konfirmasi.');
    // Di sini biasanya Anda akan mengirim data formulir ke server
});
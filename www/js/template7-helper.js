Template7.registerHelper('listHistoriHelper', (items) => {
    let html = [];

    const filter = [
        'nomor',
        'lantai',
        'tipe',
        'tanggal_masuk',
        'tanggal_keluar'
    ]

    for (const item in items) {
        if (filter.includes(item)) {
            html.push(`<li class="item-content">
                <div class="item-inner">
                    <div class="item-title">${ucfirstAll(item.replace('_',' '))}</div>
                    <div class="item-after">
                        <span class="badge color-lime">${items[item]}</span>
                    </div>
                </div>
            </li>`)
        }
    }
    return html.join(' ')
})

Template7.registerHelper('iconHelper', (status) => {
    let icon, color;
    switch (status) {
        case 'Belum diupload':
            icon = 'exclamationmark_bubble_fill'
            color = 'orange'
            break;
        case 'Menunggu konfirmasi':
            icon = 'repeat'
            color = 'primary'
            break;
        default:
            icon = 'xmark_octagon_fill'
            color = 'red'
            break;
    }

    return `<i class="icon f7-icons color-${color}">${icon}</i>`
})

Template7.registerHelper('waktuFormatter', (waktu) => {
    moment.locale('id');
    return ucfirst(moment(waktu).fromNow());
})

Template7.registerHelper('formatRupiahHelper', (biaya) => {
    const angka = biaya.toString()
    let number_string = angka != null ? angka.replace(/[^,\d]/g, '').toString() : '',
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return 'Rp ' + (rupiah ? rupiah : '');
})

function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function ucfirstAll(string) {
    const str = string.split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1))
    return str.join(' ')
}
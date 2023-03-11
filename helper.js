const benchNumPerPage = 3;
const refNumPerPage = 4;

async function getText(file, cell) {
    console.log('Fetching' + file);
    const myObject = await fetch(file);
    const myText = await myObject.text();
    cell.innerHTML = myText;
}

async function getTextWithLink(file, cell) {
    console.log('Fetching' + file);
    const myObject = await fetch(file);
    const myText = await myObject.text();
    var myTextList = myText.split('\n')
    cell.innerHTML = `<a href=${myTextList[1]} target="_blank">${myTextList[0]}</a>`;
}

async function getPaper(file, cell) {
    console.log('Fetching' + file);
    const myObject = await fetch(file);
    const myText = await myObject.text();
    var myTextList = myText.split('\n')
    cell.innerHTML = `<a href=${myTextList[2]} target="_blank">${myTextList[0]}</a>`;
}


function generateBenchmarks(tableId, filenames, page) {
    let table = document.getElementById(tableId);

    let nrRows = table.rows.length;
    for (let i = 1; i < nrRows; i++) {
        table.deleteRow(1);
    }
    const prefix = 'assets/benchmarks/';
    const end_idx = page * benchNumPerPage;
    for (let i = (page - 1) * benchNumPerPage; i < end_idx; i++) {
        let row = table.insertRow(i % benchNumPerPage + 1);
        row.style.height = '120px';
        if (i < filenames.length) {
            console.log(filenames[i]);
            let cell = row.insertCell(0);
            getText(prefix + filenames[i] + '/name.txt', cell);

            cell = row.insertCell(1);
            getPaper(prefix + filenames[i] + '/paper.txt', cell);
        }
        else {
            let cell = row.insertCell(0);
            cell.innerHTML = '<br>';
            cell = row.insertCell(1);
            cell.innerHTML = '<br>';
        }
    }
}


function generateRichTable(tableId, filenames, page) {
    let table = document.getElementById(tableId);

    let nrRows = table.rows.length;
    for (let i = 1; i < nrRows; i++) {
        table.deleteRow(1);
    }
    const prefix = 'assets/references/';
    const end_idx = page * refNumPerPage;
    for (let i = (page - 1) * refNumPerPage; i < end_idx; i++) {
        let row = table.insertRow(i % refNumPerPage + 1);
        row.style.height = '120px';
        if (i < filenames.length) {
            console.log(filenames[i]);
            let cell = row.insertCell(0);
            getTextWithLink(prefix + filenames[i] + '/title.txt', cell);

            cell = row.insertCell(1);
            getText(prefix + filenames[i] + '/abstract.txt', cell);
        }
        else {
            let cell = row.insertCell(0);
            cell.innerHTML = '<br>';
            cell = row.insertCell(1);
            cell.innerHTML = '<br>';
        }
    }
}

benchmarks = [
    'shapley',
];

references = [
    'BalazinskaHS11',
    'LiuLL0PS21',
];

generateBenchmarks('benchmarks', benchmarks, 1)
generateRichTable('references', references, 1);

$(document).ready(function () {
    for (let i = 1; i <= 3; i++) {
        let id = '#benchmarks-' + i;
        $(id).click(function () {
            generateBenchmarks('benchmarks', references, i);
            $(id).parent().siblings().removeClass('active');
            $(id).parent().addClass('active');
            return false;
        });
    };

    for (let i = 1; i <= 3; i++) {
        let id = '#references-' + i;
        $(id).click(function () {
            generateRichTable('references', references, i);
            $(id).parent().siblings().removeClass('active');
            $(id).parent().addClass('active');
            return false;
        });
    };
});
import tablaDatosHelper from '../helpers/TablaDatosHelper';
const tablaDatosTest = tablaDatosHelper.getTablaDatosFromRawArrays(
  [
    //
    ["1C", "QUARTER 3C", null, null, "2C", null, "4C", null, null,null],
    // Row 13
    [2013, "Q1", 508.7, 23.4, 444.9, 22.1, 8.2, 3, 961.9, 38.7],

    // Row 14
    [null, "Q2", 553, 24.1, "4R x 4C", null, null, null, 998.6, 38.9],

    // Row 15
    [null, "Q3", 569.2, 24.3, null, null, null, null, 1006.8, 38.7],

    // Row 16
    [null, "Q4", 609.1, 25.6, null, null, null, null, 1040.2, null],
    //s['U13','Total', 329264, 202547, 385440, 769594, 960635, 1155610, 1542690, 1715027, 1658490, 1556412]
  ]
);
export default tablaDatosTest;

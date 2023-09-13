const childProcess = require('child_process');
let scan = [];

const cmd = 'iwconfig wlp2s0';
childProcess.exec(cmd, (err, stdout, stderr) => {
    if (err) {
        console.log(`err:${err}`);
    }
    // if (stdout) {
    //   Network.config.wifi_ssid = stdout.trim();
    //   const ssidIndex = Wifi.checkDuplicateWifiConfig({ wifi_ssid: Network.config.wifi_ssid });
    //   if (ssidIndex === null) return;
    //   const psk = Network.config.wifi_list[ssidIndex].wifi_psk;

    //   Network.config.wifi_psk = psk;
    //   if (!Network.config.wifi_ssid) {
    //     Network.config.wifi_psk = undefined;
    //   }
    // }
    if (stderr) {
        console.log(`stderr:${stderr.trim()}`);
    }
    if (stdout) {
        let current = {};
        const lines = ['wlp2s0    IEEE 802.11  ESSID:""'];
        lines.forEach((line) => {
            let m;
            m = /ESSID:"(.*)"/.exec(line);
            if (m) {
                console.log(line);
                [, current.wifi_ssid] = m;
            }
            m = /Signal level\W(.+?) dBm/.exec(line);
            if (m) {
                [, current.sig] = m;
                current.sig = +current.sig;
            }
        });
        console.log(JSON.stringify(current.wifi_ssid));
    }
});

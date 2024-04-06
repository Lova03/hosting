import backup from '../assets/backup.png';
import cashback from '../assets/cashback.png';
import ddos from '../assets/ddos.png';
import panel from '../assets/panel.png';
import performance from '../assets/performance.png';
import support from '../assets/support.png';
import levels from '../assets/levels.png';
import HostingFeature from './HostingFeature';

function HostingFeatures() {
  return (
    <div className='grid grid-cols-2 place-items-center gap-8 max-w-6xl'>
      <HostingFeature
        title='EXTREME PERFORMANCE'
        desc='Our servers are built to last with the fastest speeds on the market for your services, to
      provide extreme performance and never have any issues again!'
        image={performance}
      />

      <HostingFeature
        title='STRONG DDOS PROTECTION'
        desc='All servers networking traffic is passing through strong active and passive DDoS filters to
        detect DDoS attacks within seconds and prevent downtime from DDoS attacks!'
        image={ddos}
      />

      <HostingFeature
        title='DAILY BACKUPS'
        desc='Do not fear losing your files ever again! We take daily backups on all services, and we can
        provide a copy at any point of time, just make a ticket!'
        image={backup}
      />

      <HostingFeature
        title='24/7 DEDICATED SUPPORT'
        desc='Our professional support team is there for all your inquiries 24/7/365! Do not hesitate to
        contact us for any issues or questions you have, we are here for you!'
        image={support}
      />

      <HostingFeature
        title='CUSTOM PANEL & SOFTWARE'
        desc='Running our custom control panel and software to host your services allows us to provide one
        of the best experiences and performance on the market!'
        image={panel}
      />

      <HostingFeature
        title='14 DAYS MONEY-BACK GUARANTEE'
        desc='Feeling unsatisfied? We offer a full money-back guarantee within the first 14 days if you are
        not satisfied with your service!'
        image={cashback}
      />

      <HostingFeature
        title='LEVEL REWARDS'
        desc='Unlock exclusive rewards and perks every time you refill your wallet. The more you invest in our services, the more benefits you reap!'
        image={levels}
      />
    </div>
  );
}

export default HostingFeatures;

import styles from './Duality.module.css'

export function Duality() {
  return (
    <section className={styles.duality} id="work">
      <div className="wrap">
        <div className={styles.head}>
          <p className={styles.eyebrow}>Two ways he shows up</p>
          <h2>The operator behind the businesses, and the interviewer behind the questions.</h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.col}>
            <p className={styles.tag}>Operator</p>
            <h3>Business &amp; property, hands-on</h3>
            <p>
              Concierge Business Advisor at CBA Lifestyle — coordinating the real, unglamorous
              work behind running a business or property well.
            </p>
            <ul>
              <li>Property &amp; project coordination</li>
              <li>Contractor and vendor management</li>
              <li>Business operations advisory</li>
            </ul>
          </div>

          <div className={styles.col}>
            <p className={styles.tag}>Interviewer</p>
            <h3>Decisions, examined slowly</h3>
            <p>
              Host of <em>The Living Question</em> — long conversations with founders and leaders
              about the calls that logic alone couldn&rsquo;t make.
            </p>
            <ul>
              <li>Weekly, long-form conversations</li>
              <li>No packaged lessons or forced takeaways</li>
              <li>Guests: founders, leaders, and builders</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

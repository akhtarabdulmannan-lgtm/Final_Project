export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx max-w-4xl">
        <div className="card p-8 sm:p-12 bg-surface space-y-6">
          <div className="space-y-2">
            <h1>Privacy Policy</h1>
            <p className="text-caption text-ink-500">Last updated: November 9, 2026</p>
          </div>

          <p>
            VectisX is a student coursework project, not a company. This page describes, in plain
            terms, the very small amount of data the site handles, because a site that collects an
            email address should say so plainly rather than borrow the wording of a corporate
            privacy policy it does not need.
          </p>

          <section className="space-y-2">
            <h2>1. Information We Collect</h2>
            <p>
              If you create an account, the email address you register with and the display name
              you type are stored by Supabase, along with the minimum metadata needed to sign you
              in and to send a confirmation email. If you use the contact form, the message and
              address you submit are stored in the project database. Nothing else is collected:
              no identity documents, no bank details, no payment information, and no cookies for
              advertising or tracking, because none of those things exist here.
            </p>
          </section>

          <section className="space-y-2">
            <h2>2. How the Data Is Held</h2>
            <p>
              Data is stored in a Supabase Postgres database with row-level security enabled on
              every table; anonymous reads are denied and have been tested as denied. Traffic to
              the site and to Supabase uses HTTPS. There is no separate encryption claim to make
              beyond that, and this project has not commissioned a security audit. Your data is
              never sold, rented or shared with advertisers, because there are no advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2>3. Your Privacy Rights</h2>
            <p>
              To have an account deleted, or to ask what is held about you, write to
              akhtarabdulmannan@gmail.com and it will be removed. There are no statutory banking
              retention obligations to qualify that, because no banking records exist.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

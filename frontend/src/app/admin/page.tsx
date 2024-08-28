import UserCruds from '@/components/CRUDs/userCruds.component';

export const Admin = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <UserCruds></UserCruds>
    </main>
  );
};

export default Admin;

import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { contactService } from '@/admin/services/contactService';

const ContactListPage = () => {
  const { setHeaderContent } = useOutletContext();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    setHeaderContent({
      title: 'Contact Management',
      desc: 'List of student inquiries and messages'
    });
    document.title = 'Contact Management | Star Classes Admin';
  }, [setHeaderContent]);

  useEffect(() => {
    contactService.getContacts().then(data => {
      setContacts(data);
      setFilteredContacts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Filter effect
  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(contacts.filter(contact => contact.status === selectedStatus));
    }
  }, [selectedStatus, contacts]);

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      setUpdatingId(contactId);
      const result = await contactService.updateStatus(contactId, newStatus);
      if (result.status === 'success') {
        setContacts(contacts.map(contact => 
          contact.id === contactId ? result.data : contact
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'primary';
      case 'completed':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <section className="p-4 main-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <label className="mb-0">Filter by status:</label>
          <select 
            className="form-select" 
            style={{width: '200px'}}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive" style={{maxHeight: '70vh', overflowY: 'auto'}}>
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 text-center" style={{width: '60px'}}>ID</th>
                <th className="border-0">Name</th>
                <th className="border-0">Email</th>
                <th className="border-0">Phone</th>
                <th className="border-0">Message</th>
                <th className="border-0">Submitted At</th>
                <th className="border-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-4"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></td></tr>
              ) : filteredContacts.length === 0 ? (
                <tr><td colSpan={7} className="text-center text-muted py-4">No contacts found</td></tr>
              ) : (
                filteredContacts.map(contact => (
                  <tr key={contact.id}>
                    <td className="text-center">{contact.id}</td>
                    <td className="text-truncate" style={{maxWidth: '120px'}} title={`${contact.first_name} ${contact.last_name}`}>{contact.first_name} {contact.last_name}</td>
                    <td className="text-truncate" style={{maxWidth: '160px'}} title={contact.email}>{contact.email}</td>
                    <td className="text-truncate" style={{maxWidth: '100px'}} title={contact.phone}>{contact.phone}</td>
                    <td className="text-truncate" style={{maxWidth: '220px'}} title={contact.message}>{contact.message}</td>
                    <td className="text-nowrap">{contact.created_at ? new Date(contact.created_at).toLocaleString() : ''}</td>
                    <td>
                      <select
                        className={`form-select form-select-sm bg-${getStatusColor(contact.status)} text-white`}
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                        disabled={updatingId === contact.id}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ContactListPage;
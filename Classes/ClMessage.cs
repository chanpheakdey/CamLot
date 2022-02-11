namespace SignalR.Classes
{
    public sealed class EventMessage
    {
        public string EventId { get; set; }
        public string Message { get; set; }
        public string Subject { get; set; }

        public EventMessage(string EventId, string Message, string Subject)
        {
            this.EventId = EventId;
            this.Message = Message;
            this.Subject = Subject;
        }
    }
}

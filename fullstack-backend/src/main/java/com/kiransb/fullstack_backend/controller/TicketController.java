package com.kiransb.fullstack_backend.controller;

import com.kiransb.fullstack_backend.model.Ticket;
import com.kiransb.fullstack_backend.model.User;
import com.kiransb.fullstack_backend.repository.TicketRepository;
import com.kiransb.fullstack_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @GetMapping("/customer/{customerId}")
    public List<Ticket> getTicketsByCustomerId(@PathVariable Long customerId) {
        return ticketRepository.findByCustomerId(customerId);
    }

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        if (ticket.getAgent() == null) {
            // Assign the agent with the least number of tickets
            List<User> agents = userRepository.findByRole("AGENT");
            User leastBusyAgent = agents.stream()
                    .min((a1, a2) -> {
                        int count1 = ticketRepository.countByAgentId(a1.getId());
                        int count2 = ticketRepository.countByAgentId(a2.getId());
                        return Integer.compare(count1, count2);
                    })
                    .orElse(null);

            ticket.setAgent(leastBusyAgent);
        }
        return ticketRepository.save(ticket);
    }

    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable Long id, @RequestBody Ticket ticketDetails) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        ticket.setTitle(ticketDetails.getTitle());
        ticket.setStatus(ticketDetails.getStatus());
        ticket.setSeverity(ticketDetails.getSeverity());
        ticket.setAgent(ticketDetails.getAgent());
        ticket.setCustomer(ticketDetails.getCustomer());
        return ticketRepository.save(ticket);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketRepository.deleteById(id);
    }
}

package com.kiransb.fullstack_backend.repository;

import com.kiransb.fullstack_backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    int countByAgentId(Long agentId);
    List<Ticket> findByCustomerId(Long customerId);
}
